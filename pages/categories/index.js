import styled from "styled-components";
import { StyledMessage } from "..";
import Modal from "@/components/Modal";
import CategoriesList from "@/components/CategoriesList";
import CategoryForm from "@/components/CategoryForm";
import Plus from "@/public/assets/images/plus.svg";
import { useState } from "react";

const StyledHeading = styled.h2`
  text-align: center;
`;

const StyledPlus = styled(Plus)`
  position: fixed;
  bottom: 4rem;
  right: calc(50% - 160px);
  width: 3rem;
  fill: grey;
`;

export default function CategoriesPage({
  categories,
  onAddCategory,
  showModal,
  setShowModal,
  familyMembers,
  onDeleteCategory,
  tasks,
}) {
  const [modalMode, setModalMode] = useState("");

  return (
    <>
      <StyledHeading>Task Categories</StyledHeading>

      {!categories.length && (
        <StyledMessage>The list is empty. Add members to begin!</StyledMessage>
      )}
      <CategoriesList
        categories={categories}
        familyMembers={familyMembers}
        setShowModal={setShowModal}
        showModal={showModal}
        modalMode={modalMode}
        setModalMode={setModalMode}
        onDeleteCategory={onDeleteCategory}
        tasks={tasks}
      />

      <StyledPlus
        onClick={() => {
          setModalMode("add");
          setShowModal(true);
        }}
        $right={true}
      />

      {showModal && modalMode === "add" && (
        <Modal $top="7rem" setShowModal={setShowModal}>
          <CategoryForm
            onAddCategory={onAddCategory}
            familyMembers={familyMembers}
            categories={categories}
          />
        </Modal>
      )}
    </>
  );
}
