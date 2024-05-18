import { useState } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import { toast } from "react-toastify";

const StyledLabel = styled.label`
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.2rem;
`;

const StyledSpan = styled.span`
  font-size: 0.9rem;
  color: red;
  float: ${({ $left }) => ($left ? "left" : "right")};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  transition: background-color 0.5s ease;
  ${({ $edit }) =>
    !$edit &&
    `
  margin: 1rem;
  background-color: var(--color-background);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);`}
`;

const StyledButtonContainer = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: space-evenly;
  gap: 0.5rem;
`;

const StyledFormButton = styled(StyledButton)`
  margin-top: 0.5rem;
`;

export default function CommentForm({
  taskId,
  onUpdateComment,
  commentToEdit,
  onChangeCommentToEdit,
  onCancelEditComment,
}) {
  const [isValidMessage, setIsValidMessage] = useState(true);
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (!data.message.trim()) {
      setIsValidMessage(false);
      event.target.message.focus();
      return;
    } else {
      setIsValidMessage(true);
    }
    if (commentToEdit) {
      if (data.message.trim() === commentToEdit.message) {
        alert("No changes were made to the form.");
        return;
      }

      const commentData = {
        ...commentToEdit,
        message: data.message.trim(),
        updatedDate: new Date(),
      };

      const response = await toast.promise(
        fetch("/api/comments", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }),
        {
          pending: "Comment updating is pending",
          success: "Comment updated successfully",
          error: "Comment not updated",
        }
      );
      if (response.ok) {
        onChangeCommentToEdit(null);
        onUpdateComment();
      }
    } else {
      const commentData = { message: data.message.trim(), date: new Date() };

      const response = await toast.promise(
        fetch("/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentData, taskId }),
        }),
        {
          pending: "Comment addition is pending",
          success: "Comment added successfully",
          error: "Comment not added",
        }
      );
      if (response.ok) {
        onUpdateComment();
        event.target.reset();
        event.target.message.focus();
      }
    }
  }

  function handleChangeMessage() {
    setIsValidMessage(true);
  }

  return (
    <StyledForm $edit={commentToEdit} onSubmit={handleSubmit}>
      <StyledLabel htmlFor="message">
        {!commentToEdit && (
          <p>
            <StyledSpan $left={true}>*</StyledSpan>Your message:
          </p>
        )}
        {!isValidMessage && <StyledSpan>Please enter the message!</StyledSpan>}
      </StyledLabel>
      <textarea
        aria-label="message"
        name="message"
        id="message"
        rows={Math.ceil(commentToEdit?.message.length / 28) || 2}
        cols="28"
        maxLength="200"
        defaultValue={commentToEdit?.message}
        onChange={handleChangeMessage}
      ></textarea>
      <StyledButtonContainer>
        {commentToEdit && (
          <StyledFormButton type="button" onClick={onCancelEditComment}>
            Cancel
          </StyledFormButton>
        )}
        <StyledFormButton type="submit">
          {commentToEdit ? "Update" : "Send"}
        </StyledFormButton>
      </StyledButtonContainer>
    </StyledForm>
  );
}
