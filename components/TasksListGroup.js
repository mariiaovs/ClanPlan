import styled from "styled-components";
import TasksList from "./TasksList";
import DownArrow from "@/public/assets/images/down-arrow.svg";
import UpArrow from "@/public/assets/images/up-arrow.svg";

const StyledSection = styled.section`
  margin: 0.5rem;
  padding: 0.5rem 0;
  background-color: var(--color-background);
  box-shadow: 1px 1px 15px -5px var(--color-font);
  transition: background-color 0.5s ease;

  @media (min-width: 900px), (min-width: 1200px) {
    margin-left: 6rem;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
`;

const StyledGroupHeading = styled.h3`
  ${({ $red }) => $red && `color: #ff0000;`}
`;

const StyledUpArrow = styled(UpArrow)`
  stroke: var(--color-font);
  fill: var(--color-font);
  width: 2rem;
`;

const StyledDownArrow = styled(DownArrow)`
  stroke: var(--color-font);
  fill: var(--color-font);
  width: 2rem;
`;

const StyledDiv = styled.div`
  max-height: ${({ $isHide }) => ($isHide ? "0" : "500px")};
  overflow: scroll;
  transition: max-height 0.5s ease;
`;

const StyledTasksList = styled(TasksList)`
  margin-bottom: 0;
`;

export default function TasksListGroup({
  tasks,
  onSetDetailsBackLinkRef,
  groupKey,
  onHideGroup,
  hideGroup,
  $red,
}) {
  return (
    <StyledSection>
      <StyledContainer onClick={() => onHideGroup(groupKey)}>
        <StyledGroupHeading $red={$red}>
          {groupKey} ({tasks.length})
        </StyledGroupHeading>
        {hideGroup[groupKey] ? <StyledDownArrow /> : <StyledUpArrow />}
      </StyledContainer>
      <StyledDiv $isHide={hideGroup[groupKey]}>
        <StyledTasksList
          tasks={tasks}
          onSetDetailsBackLinkRef={onSetDetailsBackLinkRef}
          allTasks
        />
      </StyledDiv>
    </StyledSection>
  );
}
