import styled from "styled-components";
import Link from "next/link";
import checkForToday from "@/utils/checkForToday";
import checkForMissedDate from "@/utils/checkForMissedDate";
import Flame from "@/public/assets/images/flame.svg";
import formatTasksDate from "@/utils/formatTasksDate";

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 8fr;
  gap: 1rem;
  font-size: 0.9rem;
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
  grid-template-columns: 8fr 5fr;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

const StyledFlame = styled(Flame)`
  display: inline-block;
  width: 1rem;
  margin: 0 0.2rem;
`;

const StyledSpan = styled.span`
  color: ${({ $isMissed }) => $isMissed && "var(--color-alert)"};
`;

const StyledParagraphContent = styled.p`
  font-size: larger;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function TaskPreview({
  task,
  onCheckboxChange,
  onSetDetailsBackLinkRef,
}) {
  const { title, category, priority, dueDate, _id: id, isDone } = task;
  const isToday = dueDate && checkForToday(dueDate);
  const isMissed = dueDate && checkForMissedDate(dueDate);
  return (
    <StyledSection>
      <StyledCheckbox
        type="checkbox"
        defaultChecked={isDone}
        onChange={(event) => onCheckboxChange(task, event)}
      />
      <StyledLink
        href={`/tasks/${id}`}
        onClick={() => onSetDetailsBackLinkRef("/")}
      >
        <StyledParagraphContent>{title}</StyledParagraphContent>

        <StyledParagraph>
          {[...Array(Number(priority))].map((_element, index) => (
            <StyledFlame key={index} />
          ))}
        </StyledParagraph>
        <p>{category?.title}</p>
        <StyledParagraph>
          <StyledSpan $isMissed={isMissed}>
            {isToday ? "Today" : formatTasksDate(dueDate)}
          </StyledSpan>
        </StyledParagraph>
      </StyledLink>
    </StyledSection>
  );
}
