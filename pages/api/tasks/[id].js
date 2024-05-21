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
      const tasks =
        updateRequest === "all"
          ? await Task.find({
              groupId: updatedTask.groupId,
              isDone: { $ne: true },
            }).sort({
              dueDate: 1,
            })
          : await Task.find({
              groupId: updatedTask.groupId,
              isDone: { $ne: true },
              dueDate: { $gte: updatedTask.dueDate },
            }).sort({
              dueDate: 1,
            });

      if (updatedTask.repeat === "Monthly") {
        for (const task of tasks) {
          const updatedDueDate = new Date(updatedTask.dueDate);
          const existingTaskDueDate = new Date(task.dueDate);

          const updatedMonthlyTask = {
            ...updatedTask,
            dueDate: convertDateToString(
              new Date(
                existingTaskDueDate.getFullYear(),
                existingTaskDueDate.getMonth(),
                updatedDueDate.getDate()
              )
            ),
          };
          await Task.findByIdAndUpdate(task._id, updatedMonthlyTask);
        }
      } else if (updatedTask.repeat === "Weekly") {
        const nextWeekDueDate = new Date(updatedTask.dueDate);
        for (const task of tasks) {
          const updatedWeeklyTask = {
            ...updatedTask,
            dueDate: convertDateToString(nextWeekDueDate),
          };
          await Task.findByIdAndUpdate(task._id, updatedWeeklyTask);
          nextWeekDueDate.setDate(nextWeekDueDate.getDate() + 7);
        }
      } else if (updatedTask.repeat === "Daily") {
        for (const task of tasks) {
          const updatedDailyTask = {
            ...updatedTask,
            dueDate: task.dueDate,
          };
          await Task.findByIdAndUpdate(task._id, updatedDailyTask);
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
