import TaskDetails from "@/components/TaskDetails";
import { useRouter } from "next/router";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";
import StyledBackLink from "@/components/StyledBackLink";
import useSWR from "swr";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

export default function DetailsPage({
  showModal,
  setShowModal,
  detailsBackLinkRef,
}) {
  const router = useRouter();
  const { id } = router.query;

  const { data: task, isLoading, mutate } = useSWR(`/api/tasks/${id}`);

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!task) {
    return;
  }

  async function handleCheckboxChange(task, event) {
    const updatedTaskData = { ...task, isDone: event.target.checked };
    const response = await fetch(`/api/tasks/${task._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTaskData),
    });
    if (response.ok) {
      mutate();
    }
  }

  return (
    <>
      <StyledBackLink href={detailsBackLinkRef}>
        <BackArrow />
      </StyledBackLink>

      {task ? (
        <TaskDetails
          task={task}
          showModal={showModal}
          setShowModal={setShowModal}
          onCheckboxChange={handleCheckboxChange}
        />
      ) : (
        <StyledMessage>Page not found!</StyledMessage>
      )}
    </>
  );
}
