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
}
