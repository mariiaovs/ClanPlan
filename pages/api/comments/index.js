import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const commentData = request.body.commentData;
      const taskId = request.body.taskId;
      const comment = await Comment.create(commentData);
      const commentId = comment._id;
      const task = await Task.findById(taskId);
      if (!task.comments) {
        task.comments = [];
      }
      task.comments.push(commentId);
      await task.save();
      response
        .status(201)
        .json({ status: "Comment added to task successfully" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    try {
      const commentData = request.body;
      await Comment.findByIdAndUpdate(commentData._id, commentData);
      response.status(200).json({ status: "Comment updated successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const { commentId, taskId } = request.body;
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return response.status(404).json({ error: "Comment not found" });
      }
      await Comment.findByIdAndDelete(commentId);
      const task = await Task.findById(taskId);
      if (!task) {
        return response.status(404).json({ error: "Task not found" });
      }
      await Task.findByIdAndUpdate(
        taskId,
        { $pull: { comments: commentId } },
        { new: true }
      );
      response.status(200).json({ status: "Comment deleted successfully." });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal server error" });
    }
  }
}
