import styled from "styled-components";
import StyledButton from "./StyledButton";
import CloseButton from "./CloseButton";

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

const StyledConfirmButton = styled(StyledButton)`
  min-width: 5rem;
  width: auto;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0.2rem;
  margin-top: 1.5rem;
  padding: 1rem 0.5rem;
  border-radius: 1rem;
`;

const StyledParagraph = styled.p`
  font-size: larger;
  font-weight: 600;
  text-align: center;
`;

export default function ConfirmBox({
  onConfirm,
  message,
  onConfirmAllTasks,
  onConfirmFurtherTasks,
  groupId,
}) {
  return (
    <StyledSection>
      <StyledParagraph>{message}</StyledParagraph>
      <ButtonContainer>
        <StyledConfirmButton onClick={onConfirm}>
          {groupId ? "This task" : "Yes"}
        </StyledConfirmButton>
        {groupId && (
          <>
            <StyledConfirmButton onClick={onConfirmFurtherTasks}>
              Future tasks
            </StyledConfirmButton>
            <StyledConfirmButton onClick={onConfirmAllTasks}>
              All tasks
            </StyledConfirmButton>
          </>
        )}
      </ButtonContainer>
    </StyledSection>
  );
}
