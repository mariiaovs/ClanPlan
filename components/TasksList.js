import TaskPreview from "./TaskPreview";
import styled from "styled-components";

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

export default function TasksList({ tasks, onCheckboxChange, categories }) {
  function handleCurrentTask(dueDate) {
    const today = new Date();
    return today.toDateString() === new Date(dueDate).toDateString();
  }
  return (
    <StyledList>
      {tasks.map((task) => (
        <StyledListItems
          key={task.id}
          $current={handleCurrentTask(task.dueDate)}
          $isDone={task.isDone}
        >
          <TaskPreview
            task={task}
            onCheckboxChange={onCheckboxChange}
            categories={categories}
          />
        </StyledListItems>
      ))}
    </StyledList>
  );
}
