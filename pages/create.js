import Form from "@/components/Form";
import Header from "@/components/Header";

export default function CreatePage({ onAddTask, familyMembers, categories }) {
  return (
    <div>
      <Header />
      <Form
        onTaskSubmit={onAddTask}
        title="Add a task"
        familyMembers={familyMembers}
        categories={categories}
      />
    </div>
  );
}
