import styled from "styled-components";
import StyledButton from "./StyledButton";
import CloseButton from "./CloseButton";

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0.2rem;
  padding: 1rem;
  border-radius: 1rem;
`;

const StyledParagraph = styled.p`
  font-size: larger;
  font-weight: 600;
  text-align: center;
`;

export default function ConfirmBox({
  setShowModal,
  onConfirm,
  id,
  message,
  onConfirmAllTasks,
  onConfirmFutherTasks,
  groupId,
}) {
  return (
    <StyledSection>
      <CloseButton setShowModal={setShowModal} />
      <StyledParagraph>{message}</StyledParagraph>
      <ButtonContainer>
        <StyledButton onClick={() => onConfirm(id)}>
          {groupId ? "This task" : "Yes"}
        </StyledButton>
        {groupId && (
          <>
            <StyledButton onClick={() => onConfirmFutherTasks(id)}>
              Future tasks
            </StyledButton>
            <StyledButton onClick={() => onConfirmAllTasks(id)}>
              All tasks
            </StyledButton>
          </>
        )}
      </ButtonContainer>
    </StyledSection>
  );
}
