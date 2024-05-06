import TaskPreview from "./TaskPreview";
import styled from "styled-components";
import useSWR from "swr";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`;

const StyledListItems = styled.li`
  border-radius: 2rem;
  transition: background-color 0.5s ease, color 0.5s ease, opacity 0.5s ease;
  background-color: ${({ $current, $isDone }) =>
    $isDone ? "lightgray" : $current ? "#f1afaffc" : "white"};
  opacity: ${({ $isDone }) => $isDone && "0.5"};
  color: ${({ $isDone }) => $isDone && "gray"};
  padding: 1rem;
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
  margin: 0.5rem;
`;

export default function TasksList({ tasks, setDetailsBackLinkRef }) {
  function handleCurrentTask(dueDate) {
    const today = new Date();
    return today.toDateString() === new Date(dueDate).toDateString();
  }

  const { mutate } = useSWR("/api/tasks");

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
    <StyledList>
      {tasks.map((task) => (
        <StyledListItems
          key={task._id}
          $current={handleCurrentTask(task.dueDate)}
          $isDone={task.isDone}
        >
          <TaskPreview
            task={task}
            onCheckboxChange={handleCheckboxChange}
            setDetailsBackLinkRef={setDetailsBackLinkRef}
          />
        </StyledListItems>
      ))}
    </StyledList>
  );
}
