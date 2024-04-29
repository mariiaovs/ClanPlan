import Form from "@/components/Form";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import { useRouter } from "next/router";
import StyledBackLink from "@/components/StyledBackLink";

export default function EditPage({
  onEditData,
  tasks,
  familyMembers,
  categories,
}) {
  const router = useRouter();
  const { id } = router.query;

  const task = tasks.find((task) => task.id === id);

  const allocatedMembersIds = categories.find(
    (category) => category.id === task?.category
  )?.selectedMembers;

  const allocatedMembersList = allocatedMembersIds?.map((memberId) => ({
    id: memberId,
    name: familyMembers?.find((member) => member.id === memberId)?.name,
  }));

  return (
    <>
      <div>
        <StyledBackLink href={`/tasks/${id}`}>
          <BackArrow />
        </StyledBackLink>
        <Form
          onTaskSubmit={onEditData}
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
