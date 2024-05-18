import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";
import Task from "@/db/models/Task";
import convertDateToString from "@/utils/convertDateToString";

export default async function handler(request, response) {
  await dbConnect();
  const { id, deleteRequest, updateRequest } = request.query;

  if (request.method === "GET") {
    const task = await Task.findById(id)
      .populate("category")
      .populate("assignedTo");

    if (task?.comments) {
      await task.populate("comments");
    }

    if (!task) {
      return response.status(404).json({ status: "Task not found" });
    }

    response.status(200).json(task);
  }

  if (request.method === "PUT") {
    const updatedTask = request.body;
    if (updateRequest === "all" || updateRequest === "future") {
      const tasks = await Task.find({
        groupId: updatedTask.groupId,
        isDone: { $ne: true },
      }).sort({
        dueDate: 1,
      });
      const startDate =
        updateRequest === "future"
          ? new Date(updatedTask.dueDate)
          : new Date(tasks[0].dueDate);
      const endDate = new Date(updatedTask.endDate);

      if (tasks && tasks.length > 0) {
        updateRequest === "future"
          ? await Task.deleteMany({
              groupId: updatedTask.groupId,
              dueDate: { $gte: updatedTask.dueDate },
              isDone: { $ne: true },
            })
          : await Task.deleteMany({
              groupId: updatedTask.groupId,
              isDone: { $ne: true },
            });
      }

      if (updatedTask.repeat === "monthly") {
        const nextMonthDueDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth()
        );
        const currentDay = new Date(updatedTask.dueDate).getDate();

        while (nextMonthDueDate <= endDate) {
          const dayInMonth = new Date(
            nextMonthDueDate.getFullYear(),
            nextMonthDueDate.getMonth() + 1,
            0
          ).getDate();
          if (
            currentDay <= dayInMonth &&
            new Date(
              nextMonthDueDate.getFullYear(),
              nextMonthDueDate.getMonth(),
              currentDay
            ) <= endDate
          ) {
            updatedTask.dueDate = convertDateToString(
              new Date(
                nextMonthDueDate.getFullYear(),
                nextMonthDueDate.getMonth(),
                currentDay
              )
            );

            await Task.create(updatedTask);
          }
          nextMonthDueDate.setMonth(nextMonthDueDate.getMonth() + 1);
        }
      } else if (updatedTask.repeat === "weekly") {
        const nextWeekDueDate = startDate;
        while (nextWeekDueDate <= endDate) {
          updatedTask.dueDate = convertDateToString(nextWeekDueDate);
          await Task.create(updatedTask);
          nextWeekDueDate.setDate(nextWeekDueDate.getDate() + 7);
        }
      } else if (updatedTask.repeat === "daily") {
        const nextDayDueDate = startDate;
        while (nextDayDueDate <= endDate) {
          updatedTask.dueDate = convertDateToString(nextDayDueDate);
          await Task.create(updatedTask);
          nextDayDueDate.setDate(nextDayDueDate.getDate() + 1);
        }
      }
      response.status(200).json({ status: "Tasks updated successfully." });
    } else {
      await Task.findByIdAndUpdate(id, updatedTask);
      response.status(200).json({ status: "Task updated successfully." });
    }
  }

  if (request.method === "PATCH") {
    const updatedTask = request.body;
    await Task.findByIdAndUpdate(id, updatedTask, { new: true });
    response.status(200).json({ status: "Task updated successfully." });
  }

  async function deleteComments(tasksToDelete) {
    const commentIdsToDelete = [];
    for (const task of tasksToDelete) {
      commentIdsToDelete.push(...task.comments);
    }
    await Comment.deleteMany({ _id: { $in: commentIdsToDelete } });
  }

  if (request.method === "DELETE") {
    if (deleteRequest === "all") {
      const task = await Task.findById(id);
      const groupId = task?.groupId;
      const tasksToDelete = await Task.find({
        groupId: groupId,
        isDone: { $ne: true },
      });
      deleteComments(tasksToDelete);
      await Task.deleteMany({ groupId: groupId, isDone: { $ne: true } });
      response.status(200).json({ status: "Tasks deleted successfully." });
    } else if (deleteRequest === "future") {
      const task = await Task.findById(id);
      const futherTasksToDelete = await Task.find({
        groupId: task.groupId,
        dueDate: { $gte: task.dueDate },
        isDone: { $ne: true },
      });
      deleteComments(futherTasksToDelete);
      await Task.deleteMany({
        groupId: task.groupId,
        dueDate: { $gte: task.dueDate },
        isDone: { $ne: true },
      });
      response.status(200).json({ status: "Tasks deleted successfully." });
    } else {
      const task = await Task.findById(id);
      for (const commentId of task.comments) {
        await Comment.findByIdAndDelete(commentId);
      }
      await Task.findByIdAndDelete(id);
      response.status(200).json({ status: "Task deleted successfully." });
    }
  }
}
