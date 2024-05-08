import styled from "styled-components";
import { StyledMessage } from "..";
import Modal from "@/components/Modal";
import CategoriesList from "@/components/CategoriesList";
import CategoryForm from "@/components/CategoryForm";
import Plus from "@/public/assets/images/plus.svg";
import useSWR from "swr";
import { useState } from "react";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import { toast } from "react-toastify";

const StyledHeading = styled.h2`
  text-align: center;
`;

const StyledPlus = styled(Plus)`
  position: fixed;
  bottom: 5rem;
  right: calc(50% - 160px);
  width: 3rem;
  fill: var(--color-background);
  cursor: pointer;
  stroke: var(--color-font);
`;

export default function CategoriesPage({
  showModal,
  setShowModal,
  familyMembers,
}) {
  const [modalMode, setModalMode] = useState("");

  const { data: categories, isLoading, mutate } = useSWR("/api/categories");

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!categories) {
    return;
  }

  async function handleAddCategory(newCategoryData) {
    const response = await toast.promise(
      fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategoryData),
      }),
      {
        pending: "Category addition is pending",
        success: "Category added successfully",
        error: "Category not added",
      }
    );
    if (response.ok) {
      setShowModal(false);
      mutate();
    }
  }

  return (
    <>
      <StyledHeading>Task Categories</StyledHeading>

      {!categories.length && (
        <StyledMessage>The list is empty. Add members to begin!</StyledMessage>
      )}
      <CategoriesList
        familyMembers={familyMembers}
        setShowModal={setShowModal}
        showModal={showModal}
        modalMode={modalMode}
        setModalMode={setModalMode}
        categories={categories}
        mutate={mutate}
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
            formHeading="Add a category"
            onSubmitCategory={handleAddCategory}
            familyMembers={familyMembers}
            categories={categories}
          />
        </Modal>
      )}
    </>
  );
}
