import Form from "@/components/Form";
import Header from "@/components/Header";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import StyledBackLink from "@/components/StyledBackLink";

export default function CreatePage({ onAddTask, familyMembers, categories }) {
  return (
    <div>
      <Header />
      <StyledBackLink href="/">
        <BackArrow />
      </StyledBackLink>
      <Form
        onTaskSubmit={onAddTask}
        title="Add a task"
        familyMembers={familyMembers}
        categories={categories}
      />
    </div>
  );
}
