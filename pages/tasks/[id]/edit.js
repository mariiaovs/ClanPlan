import Form from "@/components/Form";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import { useRouter } from "next/router";
import StyledBackLink from "@/components/StyledBackLink";
import useSWR from "swr";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";

export default function EditPage({ familyMembers, categories }) {
  const router = useRouter();
  const { id } = router.query;

  const { data: task, isLoading } = useSWR(`/api/tasks/${id}`);

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!task) {
    return;
  }

  const allocatedMembersList = categories.find(
    (category) => category._id === task?.category?._id
  )?.selectedMembers;

  async function handleEditTaskData(updatedTask) {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    if (response.ok) {
      router.push(`/tasks/${id}`);
    }
  }

  return (
    <>
      <div>
        <StyledBackLink href={`/tasks/${id}`}>
          <BackArrow />
        </StyledBackLink>
        <Form
          onTaskSubmit={handleEditTaskData}
          title="Edit a task"
          isEdit
          value={task}
          familyMembers={familyMembers}
          categories={categories}
          allocatedMembersList={allocatedMembersList}
        />
      </div>
    </>
  );
}
