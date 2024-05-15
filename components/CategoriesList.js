import styled from "styled-components";
import { useState } from "react";
import DownArrow from "@/public/assets/images/down-arrow.svg";
import UpArrow from "@/public/assets/images/up-arrow.svg";
import StyledTrash from "./StyledTrash";
import Modal from "./Modal";
import DeleteConfirmBox from "./DeleteConfirmBox";
import Pen from "@/public/assets/images/edit-pen-icon.svg";
import StyledButton from "./StyledButton";
import CategoryForm from "./CategoryForm";
import useSWR from "swr";
import StyledLoadingAnimation from "./StyledLoadingAnimation";
import { toast } from "react-toastify";

const StyledList = styled.ul`
  display: flex;
  padding: 0;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem;
  list-style: none;
`;

const StyledListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  box-shadow: 1px 1px 10px -1px var(--color-font);
  border-radius: 2rem;
  padding: 1rem 2rem;
  border: none;
  transition: background-color 0.5s ease;
`;

const StyledListOfMembers = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StyledMemberItem = styled.li`
  text-align: left;
`;

const StyledPen = styled(Pen)`
  width: 1.5rem;
  position: absolute;
  top: 15px;
  right: 60px;
  fill: var(--color-font);
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const StyleHeading = styled.h3`
  max-width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledUpArrow = styled(UpArrow)`
  margin: auto;
  stroke: var(--color-font);
  fill: var(--color-font);
`;

const StyledDownArrow = styled(DownArrow)`
  margin: auto;
  stroke: var(--color-font);
  fill: var(--color-font);
`;

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

const StyledPragraph = styled.p`
  font-size: larger;
  font-weight: 600;
  text-align: center;
`;

export default function CategoriesList({
  showModal,
  setShowModal,
  modalMode,
  setModalMode,
  familyMembers,
  categories,
  mutate,
}) {
  const [selected, setSelected] = useState(null);
  const [categoryToHandle, setCategoryToHandle] = useState(null);

  const { data: tasks, isLoading } = useSWR("/api/tasks");

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!tasks) {
    return;
  }

  const categoryIsUsed =
    categoryToHandle &&
    tasks.filter(
      (task) => !task.isDone && task.category?._id === categoryToHandle?._id
    ).length > 0;

  function handleTrashClick(category, event) {
    setCategoryToHandle(category);
    setModalMode("delete");
    setShowModal(true);
    event.stopPropagation();
  }

  async function handleDeleteCategory(id) {
    const response = await toast.promise(
      fetch(`/api/categories/${id}`, {
        method: "DELETE",
      }),
      {
        pending: "Category deletion is pending",
        success: "Category deleted successfully",
        error: "Category not deleted",
      }
    );
    if (response.ok) {
      setShowModal(false);
      mutate();
    }
  }

  async function handleEditCategory(updatedCategory) {
    const response = await toast.promise(
      fetch(`/api/categories/${updatedCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      }),
      {
        pending: "Category updation is pending",
        success: "Category updated successfully",
        error: "Category not updated",
      }
    );

    if (response.ok) {
      setShowModal(false);
      mutate();
    }
  }

  function handlePenClick(category, event) {
    setCategoryToHandle(category);
    const categoryIsUsed =
      category &&
      tasks.filter(
        (task) => !task.isDone && task.category?._id === category._id
      ).length > 0;
    if (categoryIsUsed) {
      setModalMode("confirm-edit");
      setShowModal(true);
    } else {
      setModalMode("edit");
      setShowModal(true);
    }
    event.stopPropagation();
  }

  function handleExpand(index) {
    if (selected === index) {
      setSelected(null);
      return;
    }
    setSelected(index);
  }

  return (
    <>
      <StyledList>
        {categories.map((category, index) => (
          <StyledListItem
            key={category._id}
            onClick={() => handleExpand(index)}
          >
            <StyledPen onClick={(event) => handlePenClick(category, event)} />
            <StyledTrash
              onClick={(event) => {
                handleTrashClick(category, event);
              }}
            />
            <StyleHeading title={category.title}>
              <strong>{category.title}</strong>
            </StyleHeading>
            {selected === index && (
              <StyledListOfMembers>
                {category.selectedMembers.map((member) => (
                  <StyledMemberItem key={member._id}>
                    {member.name}
                  </StyledMemberItem>
                ))}
              </StyledListOfMembers>
            )}
            {selected === index ? <StyledUpArrow /> : <StyledDownArrow />}
          </StyledListItem>
        ))}
      </StyledList>
      <Modal
        $top="12rem"
        setShowModal={setShowModal}
        $open={showModal && modalMode === "delete"}
      >
        {showModal && modalMode === "delete" && (
          <DeleteConfirmBox
            message={
              categoryIsUsed
                ? `Category "${categoryToHandle.title}" is used in active tasks. Are you sure you want to delete "${categoryToHandle.title}"?`
                : `Are you sure you want to delete "${categoryToHandle.title}"?`
            }
            setShowModal={setShowModal}
            onConfirm={handleDeleteCategory}
            id={categoryToHandle._id}
          />
        )}
      </Modal>
      <Modal
        $top="13rem"
        setShowModal={setShowModal}
        $open={showModal && modalMode === "confirm-edit" && categoryIsUsed}
      >
        {showModal && modalMode === "confirm-edit" && categoryIsUsed && (
          <StyledSection>
            <StyledPragraph>{`Category "${categoryToHandle.title}" is used in active tasks. Are you sure you want to edit "${categoryToHandle.title}"?`}</StyledPragraph>
            <ButtonContainer>
              <StyledButton onClick={() => setShowModal(false)}>
                No
              </StyledButton>
              <StyledButton onClick={() => setModalMode("edit")}>
                Yes
              </StyledButton>
            </ButtonContainer>
          </StyledSection>
        )}
      </Modal>
      <Modal
        $top="8rem"
        setShowModal={setShowModal}
        $open={showModal && modalMode === "edit"}
      >
        {showModal && modalMode === "edit" && (
          <CategoryForm
            formHeading="Edit a category"
            onSubmitCategory={handleEditCategory}
            categories={categories}
            value={categoryToHandle}
            familyMembers={familyMembers}
          />
        )}
      </Modal>
    </>
  );
}
