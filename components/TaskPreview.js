import styled from "styled-components";
import Link from "next/link";
import checkForToday from "@/utils/checkForToday";
import checkForMissedDate from "@/utils/checkForMissedDate";

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 8fr;
  gap: 1rem;
`;

const StyledCheckbox = styled.input`
  &:checked {
    filter: hue-rotate(180deg);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

const StyledSpan = styled.span`
  color: ${({ $isMissed }) => $isMissed && "var(--color-alert)"};
`;

const StyledParagraphContent = styled.p`
  font-size: larger;
  font-weight: 600;
`;

export default function TaskPreview({
  task,
  onCheckboxChange,
  setDetailsBackLinkRef,
}) {
  const { title, category, priority, dueDate, _id: id, isDone } = task;
  const isToday = dueDate && checkForToday(dueDate);
  const isMissed = dueDate && checkForMissedDate(dueDate);
  return (
    <StyledSection>
      <StyledCheckbox
        type="checkbox"
        checked={isDone}
        onChange={(event) => onCheckboxChange(task, event)}
      />
      <StyledLink
        href={`/tasks/${id}`}
        onClick={() => setDetailsBackLinkRef("/")}
      >
        <StyledParagraphContent>{title}</StyledParagraphContent>
        <StyledParagraph>{"🔥".repeat(Number(priority))}</StyledParagraph>
        <p>{category?.title}</p>
        <StyledParagraph>
          <StyledSpan $isMissed={isMissed}>
            {isToday ? "Today" : dueDate}
          </StyledSpan>
        </StyledParagraph>
      </StyledLink>
    </StyledSection>
  );
}
