import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";
import { uid } from "uid";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const tasks = await Task.find().populate("category");
    return response.status(200).json(tasks);
  }

  if (request.method === "POST") {
    try {
      const taskData = request.body;
      const groupId = taskData.repeat !== "none" ? uid() : null;

      const startDate = new Date(taskData.dueDate);
      const endDate = new Date(taskData.dueDate);
      endDate.setFullYear(new Date().getFullYear() + 1);

      if (taskData.repeat === "monthly") {
        const nextMonth = startDate;
        while (nextMonth < endDate) {
          taskData.dueDate = nextMonth.toISOString().substring(0, 10);
          taskData.groupId = groupId;
          await Task.create(taskData);
          nextMonth.setMonth(nextMonth.getMonth() + 1);
        }
      } else if (taskData.repeat === "weekly") {
        const nextWeek = startDate;
        while (nextWeek < endDate) {
          taskData.dueDate = nextWeek.toISOString().substring(0, 10);
          taskData.groupId = groupId;
          await Task.create(taskData);
          nextWeek.setDate(nextWeek.getDate() + 7);
        }
      } else if (taskData.repeat === "daily") {
        const nextDay = startDate;
        while (nextDay < endDate) {
          taskData.dueDate = nextDay.toISOString().substring(0, 10);
          taskData.groupId = groupId;
          await Task.create(taskData);
          nextDay.setDate(nextDay.getDate() + 1);
        }
      } else {
        await Task.create(taskData);
      }

      return response
        .status(201)
        .json({ status: "Task successfully created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
