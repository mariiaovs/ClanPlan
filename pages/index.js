import Filter from "@/components/Filter";
import TasksList from "@/components/TasksList";
import TasksListGroups from "@/components/TasksListGroups";
import styled from "styled-components";
import checkForMissedDate from "@/utils/checkForMissedDate";
import checkForToday from "@/utils/checkForToday";

const StyledSection = styled.section`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const StyledSpan = styled.span`
  color: ${({ $redColor }) =>
    $redColor ? "var(--color-alert)" : "var(--color-font)"};
  text-align: center;
  display: block;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--color-button-active)" : "var(--color-button)"};
  margin-top: 1rem;
  color: var(--color-font);
  font-weight: 700;
  padding: 0.5rem 1rem;
  align-self: center;
  border-radius: 1rem;
  color: var(--color-font);
  border: 0.5px solid var(--color-font);
`;

const StyledHeading = styled.h2`
  margin-top: 1rem;
  text-align: center;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

export default function HomePage({
  setShowModal,
  showModal,
  familyMembers,
  onSetDetailsBackLinkRef,
  categories,
  filters,
  setFilters,
  onApplyFilters,
  onDeleteFilterOption,
  onButtonClick,
  listType,
  tasks,
}) {
  const isFilterSet =
    (filters.priority !== "0" && filters.priority) ||
    filters.category ||
    filters.member
      ? true
      : false;

  const missedTasks = tasks.filter(
    (task) => task?.dueDate && checkForMissedDate(task.dueDate) && !task.isDone
  );

  const todaysTasks = tasks.filter(
    (task) => task?.dueDate && checkForToday(task.dueDate) && !task.isDone
  );

  const notAssignedTasks = tasks.filter(
    (task) => !task?.assignedTo.length && !task.isDone
  );

  const completedTasks = tasks.filter((task) => task.isDone);

  let tasksAfterListTypeSelection = tasks;
  if (listType === "today") {
    tasksAfterListTypeSelection = todaysTasks;
  } else if (listType === "missed") {
    tasksAfterListTypeSelection = missedTasks;
  } else if (listType === "done") {
    tasksAfterListTypeSelection = completedTasks;
  } else if (listType === "notAssigned") {
    tasksAfterListTypeSelection = notAssignedTasks;
  }

  const filteredTasks = tasksAfterListTypeSelection.filter(
    (task) =>
      (!Number(filters.priority) || task.priority === filters.priority) &&
      (!filters.category || task.category?._id === filters.category) &&
      (!filters.member || task.assignedTo.includes(filters.member))
  );

  return (
    <>
      <StyledSection>
        <StyledButton
          onClick={() => onButtonClick("today")}
          $isActive={listType === "today"}
        >
          <StyledSpan>Today</StyledSpan>
        </StyledButton>
        <StyledButton
          onClick={() => onButtonClick("all")}
          $isActive={listType === "all"}
        >
          <StyledSpan>All Tasks</StyledSpan>
        </StyledButton>
        <StyledButton
          onClick={() => onButtonClick("done")}
          $isActive={listType === "done"}
        >
          <StyledSpan>Done</StyledSpan>
        </StyledButton>
        <StyledButton
          onClick={() => onButtonClick("missed")}
          $isActive={listType === "missed"}
        >
          <StyledSpan $redColor={missedTasks.length}>
            Missed {missedTasks.length}
          </StyledSpan>
        </StyledButton>
        <StyledButton
          onClick={() => onButtonClick("notAssigned")}
          $isActive={listType === "notAssigned"}
        >
          <StyledSpan $redColor={notAssignedTasks.length}>
            Not assigned {notAssignedTasks.length}
          </StyledSpan>
        </StyledButton>
      </StyledSection>
      {listType === "today" && (
        <StyledHeading>
          {todaysTasks.length === 1
            ? `${todaysTasks.length} Task for today`
            : `${todaysTasks.length} Tasks for today`}
        </StyledHeading>
      )}
      {listType === "all" && <StyledHeading>My Family Tasks</StyledHeading>}
      {listType === "done" && (
        <StyledHeading>Completed Tasks </StyledHeading>
      )}{" "}
      {listType === "notAssigned" && (
        <StyledHeading>Not assigned Tasks </StyledHeading>
      )}
      {listType === "missed" && (
        <StyledHeading>
          You have missed {missedTasks.length}
          {missedTasks.length === 1 ? " Task" : " Tasks"}
        </StyledHeading>
      )}
      {tasksAfterListTypeSelection.length > 0 && (
        <Filter
          showModal={showModal}
          setShowModal={setShowModal}
          familyMembers={familyMembers}
          onApplyFilters={onApplyFilters}
          filters={filters}
          categories={categories}
          onDeleteFilterOption={onDeleteFilterOption}
          setFilters={setFilters}
        />
      )}
      {!filteredTasks.length && !isFilterSet && listType !== "today" && (
        <StyledMessage>No tasks to display.</StyledMessage>
      )}
      {!filteredTasks.length && !isFilterSet && listType === "today" && (
        <StyledMessage>
          <span>Relax!</span>
          <br />
          <span>No tasks for today</span>
        </StyledMessage>
      )}
      {!filteredTasks.length && isFilterSet && (
        <StyledMessage>No tasks with this search criteria.</StyledMessage>
      )}
      {listType !== "all" && (
        <TasksList
          tasks={filteredTasks}
          onSetDetailsBackLinkRef={onSetDetailsBackLinkRef}
        />
      )}
      {listType === "all" && (
        <TasksListGroups
          tasks={filteredTasks}
          onSetDetailsBackLinkRef={onSetDetailsBackLinkRef}
        />
      )}
    </>
  );
}
