import Form from "@/components/Form";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function CreatePage({ categories, familyMembers }) {
  const router = useRouter();

  async function handleAddTask(newTaskData) {
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
