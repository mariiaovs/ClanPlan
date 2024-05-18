import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";
import Task from "@/db/models/Task";
import convertDateToString from "@/utils/convertDateToString";

export default async function handler(request, response) {
  await dbConnect();
  const { id, deleteAll, updateAll } = request.query;

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
    if (updateAll === "true") {
      const tasks = await Task.find({ groupId: updatedTask.groupId }).sort({
        dueDate: 1,
      });
      const startDate = new Date(tasks[0].dueDate);
      const endDate = new Date(updatedTask.endDate);

      if (tasks && tasks.length > 0) {
        await Task.deleteMany({ groupId: updatedTask.groupId });
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
          if (currentDay <= dayInMonth) {
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

  if (request.method === "DELETE") {
    if (deleteAll === "true") {
      const task = await Task.findById(id);
      const groupId = task?.groupId;
      const tasksToDelete = await Task.find({ groupId: groupId });
      const commentIdsToDelete = [];
      for (const task of tasksToDelete) {
        commentIdsToDelete.push(...task.comments);
      }
      await Comment.deleteMany({ _id: { $in: commentIdsToDelete } });
      await Task.deleteMany({ groupId: groupId });
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
