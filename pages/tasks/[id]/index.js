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
  onDeleteTask,
  onCheckboxChange,
  familyMembers,
  detailsBackLinkRef,
  categories,
}) {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return;

  const task = tasks.find((task) => task.id === id);

  const backLink = detailsBackLinkRef === "/calendar" ? "/calendar" : "/";

  return (
    <>
      <StyledBackLink href={`${backLink}`}>
        <BackArrow />
      </StyledBackLink>

      {task ? (
        <TaskDetails
          task={task}
          showModal={showModal}
          setShowModal={setShowModal}
          onCheckboxChange={onCheckboxChange}
          familyMembers={familyMembers}
          categories={categories}
          onDeleteTask={onDeleteTask}
        />
      ) : (
        <StyledMessage>Page not found!</StyledMessage>
      )}
    </>
  );
}
