import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();
  const { id, deleteAll } = request.query;

  if (request.method === "GET") {
    const task = await Task.findById(id)
      .populate("category")
      .populate("assignedTo");

    if (!task) {
      return response.status(404).json({ status: "Task not found" });
    }

    if (task.comments) {
      await task.populate("comments");
    }

    response.status(200).json(task);
  }

  if (request.method === "PUT") {
    const updatedTask = request.body;
    await Task.findByIdAndUpdate(id, updatedTask);
    response.status(200).json({ status: "Task updated successfully." });
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
    } else {
      const task = await Task.findById(id);
      for (const commentId of task.comments) {
        await Comment.findByIdAndDelete(commentId);
      }
      await Task.findByIdAndDelete(id);
    }
    response.status(200).json({ status: "Product deleted successfully." });
  }
}
