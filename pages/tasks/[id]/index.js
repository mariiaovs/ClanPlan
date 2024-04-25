import TaskDetails from "@/components/TaskDetails";
import { useRouter } from "next/router";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";
import StyledBackLink from "@/components/StyledBackLink";

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

export default function DetailsPage({
  tasks,
  showModal,
  setShowModal,
  onDelete,
  onCancel,
  onCheckboxChange,
  familyMembers,
  categories,
}) {
  const router = useRouter();
  const { id } = router.query;

  const task = tasks.find((task) => task.id === id);

  return (
    <>
      <StyledBackLink href="/">
        <BackArrow />
      </StyledBackLink>

      {task ? (
        <TaskDetails
          task={task}
          showModal={showModal}
          setShowModal={setShowModal}
          onDelete={onDelete}
          onCancel={onCancel}
          onCheckboxChange={onCheckboxChange}
          familyMembers={familyMembers}
          categories={categories}
        />
      ) : (
        <StyledMessage>Page not found!</StyledMessage>
      )}
    </>
  );
}
