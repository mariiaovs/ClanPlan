import Form from "@/components/Form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function CreatePage({ categories, familyMembers }) {
  const router = useRouter();

  async function handleAddTask(newTaskData) {
    if (
      newTaskData?.repeat === "monthly" ||
      newTaskData?.repeat === "weekly" ||
      newTaskData?.repeat === "daily"
    ) {
      const response = await toast.promise(
        fetch("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTaskData),
        }),
        {
          pending: "Recurring Tasks adding is pending",
          success: "Recurring Tasks added successfully",
          error: "Recurring Tasks not added",
        }
      );
      if (response.ok) {
        router.push("/");
      }
    } else {
      const response = await toast.promise(
        fetch("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTaskData),
        }),
        {
          pending: "Task adding is pending",
          success: "Task added successfully",
          error: "Task not added",
        }
      );
      if (response.ok) {
        router.push("/");
      }
    }
  }

  return (
    <div>
      <Form
        onTaskSubmit={handleAddTask}
        title="Add a task"
        categories={categories}
        familyMembers={familyMembers}
      />
    </div>
  );
}
