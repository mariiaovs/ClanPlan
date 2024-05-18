import styled from "styled-components";
import StyledTrash from "./StyledTrash";
import Pen from "@/public/assets/images/edit-pen-icon.svg";
import Modal from "./Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import checkForToday from "@/utils/checkForToday";
import checkForMissedDate from "@/utils/checkForMissedDate";
import { toast } from "react-toastify";
import Flame from "@/public/assets/images/flame.svg";
import ConfirmBox from "./ConfirmBox";

const StyledArticle = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 1.1rem;
  right: 5rem;
`;

const StyledPen = styled(Pen)`
  width: 1.5rem;
  fill: var(--color-font);
`;

const StyledSection = styled.section`
  position: relative;
  background-color: var(--color-background);
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 2rem;
  gap: 0.6rem;
  transition: background-color 0.5s ease, color 0.5s ease, opacity 0.5s ease;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  ${({ $isDone }) =>
    $isDone &&
    `
      background-color: #d3d3d3;
      opacity: 0.5;
      color: #808080;
    `};
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
const StyledParagraphContent = styled.p`
  font-size: larger;
  font-weight: 600;
`;

const StyledFlame = styled(Flame)`
  display: inline-block;
  width: 1rem;
  margin: 0 0.2rem;
`;

const StyledSpan = styled.span`
  color: ${({ $isMissed }) => $isMissed && "var(--color-alert)"};
`;

export default function TaskDetails({
  task,
  showModal,
  setShowModal,
  onCheckboxChange,
  detailsBackLinkRef,
  modalMode,
  onChangeModalMode,
}) {
  const {
    title,
    category,
    priority,
    dueDate,
    _id: id,
    isDone,
    assignedTo,
    groupId,
    repeat,
  } = task;
  const router = useRouter();

  const isToday = dueDate && checkForToday(dueDate);
  const isMissed = dueDate && checkForMissedDate(dueDate);

  async function handleDeleteTask(id) {
    const response = await toast.promise(
      fetch(`/api/tasks/${id}?deleteRequest=single`, {
        method: "DELETE",
      }),
      {
        pending: "Task deletion is pending",
        success: "Task deleted successfully",
        error: "Task not deleted",
      }
    );
    if (response.ok) {
      router.push(detailsBackLinkRef);
      setShowModal(false);
    }
  }

  async function handleDeleteTasks(actionObject) {
    const { id, action } = actionObject;
    const response = await toast.promise(
      fetch(`/api/tasks/${id}?deleteRequest=${action}`, {
        method: "DELETE",
      }),
      {
        pending: "Recurring Tasks deletion is pending",
        success: "Recurring Tasks deleted successfully",
        error: "Recurring Tasks not deleted",
      }
    );
    if (response.ok) {
      router.push(detailsBackLinkRef);
      setShowModal(false);
    }
  }

  function handleTaskTrashClick() {
    onChangeModalMode("delete-task");
    setShowModal(true);
  }

  return (
    <>
      <Modal $top="13.5rem" setShowModal={setShowModal} $open={showModal}>
        {showModal && (
          <ConfirmBox
            setShowModal={setShowModal}
            onConfirm={() => handleDeleteTask(id)}
            onConfirmFutherTasks={() =>
              handleDeleteTasks({ id, action: "future" })
            }
            onConfirmAllTasks={() => handleDeleteTasks({ id, action: "all" })}
            id={id}
            groupId={groupId}
            message={
              groupId
                ? `Are you sure you want to delete repeating task "${title}"?`
                : `Are you sure you want to delete task "${title}"?`
            }
          />
        )}
      </Modal>

      <StyledSection $isDone={isDone}>
        <StyledTrash onClick={handleTaskTrashClick} />
        <StyledLink href={`/tasks/${id}/edit`}>
          <StyledPen />
        </StyledLink>
        <p> What is to do?</p>
        <StyledParagraphContent>{title}</StyledParagraphContent>
        <p>Category: </p>
        <StyledParagraphContent>
          {category?.title || "-"}
        </StyledParagraphContent>
        <p>Priority: </p>
        <p>
          {[...Array(Number(priority))].map((_element, index) => (
            <StyledFlame key={index} />
          ))}
        </p>
        <StyledArticle>
          <p>Due Date:</p>
          <p>Repeat:</p>
          <StyledParagraphContent>
            <StyledSpan $isMissed={isMissed}>
              {isToday ? "Today" : dueDate || "-"}
            </StyledSpan>
          </StyledParagraphContent>
          <StyledParagraphContent>{repeat || "none"}</StyledParagraphContent>
        </StyledArticle>
        <p>Assigned to:</p>
        <StyledParagraphContent>
          {assignedTo?.map((member) => member.name).join(", ") || "-"}
        </StyledParagraphContent>
        <label htmlFor="checkbox">
          Done:
          <StyledCheckbox
            type="checkbox"
            id="checkbox"
            checked={isDone}
            onChange={(event) => onCheckboxChange(task, event)}
          />
        </label>
      </StyledSection>
    </>
  );
}
