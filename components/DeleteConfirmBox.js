import styled from "styled-components";
import StyledButton from "./StyledButton";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
`;

const StyledParagraph = styled.p`
  font-size: larger;
  font-weight: 600;
  text-align: center;
`;

export default function DeleteConfirmBox({
  setShowModal,
  onConfirm,
  id,
  message,
  onConfirmAll,
  groupId,
}) {
  return (
    <StyledSection>
      <StyledParagraph>{message}</StyledParagraph>
      <ButtonContainer>
        <StyledButton onClick={() => setShowModal(false)}>No</StyledButton>
        <StyledButton onClick={() => onConfirm(id)}>
          {groupId ? "This task" : "Yes"}
        </StyledButton>
        {groupId && (
          <StyledButton onClick={() => onConfirmAll(id)}>
            {" "}
            All occurrence
          </StyledButton>
        )}
      </ButtonContainer>
    </StyledSection>
  );
}
