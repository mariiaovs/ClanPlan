import styled from "styled-components";
const StyledDiv = styled.div`
  ${({ $isDone }) =>
    $isDone &&
    `background-color: gray;
       text-decoration: line-through;`}
  color: var(--color-background);
`;
export default function CalendarEvent({ event }) {
  return (
    <StyledDiv $isDone={event.isDone}>
      <span>{event.title}</span>
    </StyledDiv>
  );
}
