import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const tasks = await Task.find().populate("category");
    return response.status(200).json(tasks);
  }

  if (request.method === "POST") {
    try {
      const taskData = request.body;
      await Task.create(taskData);

      return response
        .status(201)
        .json({ status: "Task successfully created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
