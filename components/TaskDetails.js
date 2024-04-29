import styled from "styled-components";
import StyledButton from "./StyledButton";
import Trash from "@/public/assets/images/trash-icon.svg";
import Pen from "@/public/assets/images/edit-pen-icon.svg";
import Modal from "./Modal";
import Link from "next/link";

const StyledTrash = styled(Trash)`
  width: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1.3rem;
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 1.1rem;
  right: 5rem;
`;

const StyledPen = styled(Pen)`
  width: 1.5rem;
`;

const StyledSection = styled.section`
  position: relative;
  background-color: white;
  margin: 6rem 0.5rem 5rem 0.5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 2rem;
  gap: 0.6rem;
  transition: background-color 0.5s ease, color 0.5s ease, opacity 0.5s ease;
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
  ${({ $isDone }) =>
    $isDone &&
    `
      background-color: lightgray;
      opacity: 0.5;
      color: gray;
    `};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const DeleteConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
`;

const StyledPragraph = styled.p`
  text-align: center;
`;

const StyledCheckbox = styled.input`
  margin-left: 2rem;
  display: inline;
  width: 1.5rem;
  height: 1.5rem;
  &:checked {
    filter: hue-rotate(180deg);
  }
`;

export default function TaskDetails({
  task,
  showModal,
  setShowModal,
  onDelete,
  onCancel,
  onCheckboxChange,
  familyMembers,
  categories,
}) {
  const {
    title,
    category: categoryId,
    priority,
    dueDate,
    id,
    isDone,
    assignedTo,
  } = task;

  return (
    <>
      {showModal && (
        <Modal $top="13.5rem" setShowModal={setShowModal}>
          <DeleteConfirmBox>
            <StyledPragraph>
              Are you sure you want to delete this task?
            </StyledPragraph>
            <ButtonContainer>
              <StyledButton onClick={onCancel}>No</StyledButton>
              <StyledButton onClick={() => onDelete(id)}>Yes</StyledButton>
            </ButtonContainer>
          </DeleteConfirmBox>
        </Modal>
      )}
      <StyledSection $isDone={isDone}>
        <StyledTrash onClick={() => setShowModal(true)} />
        <StyledLink href={`${id}/edit`}>
          <StyledPen />
        </StyledLink>

        <p> What is to do?</p>
        <h2>{title}</h2>
        <p>Category: </p>
        <h2>
          {categories.find((category) => category.id === categoryId)
            ?.category || "-"}
        </h2>
        <p>Priority: </p>
        <h2>{"🔥".repeat(Number(priority))}</h2>
        <p>Due Date:</p>
        <h3>{dueDate || "-"}</h3>
        <p>Assigned to:</p>
        <h3>
          {assignedTo
            .map(
              (memberId) =>
                familyMembers.find((member) => member.id === memberId)?.name
            )
            .join(", ") || "-"}
        </h3>
        <label htmlFor="checkbox">
          Done:
          <StyledCheckbox
            type="checkbox"
            id="checkbox"
            checked={isDone}
            onChange={() => onCheckboxChange(id)}
          />
        </label>
      </StyledSection>
    </>
  );
}
