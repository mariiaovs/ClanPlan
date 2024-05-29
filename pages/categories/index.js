import { StyledMessage } from "..";
import Modal from "@/components/Modal";
import CategoriesList from "@/components/CategoriesList";
import CategoryForm from "@/components/CategoryForm";
import StyledPlus from "@/components/StyledPlus";
import useSWR from "swr";
import { useState } from "react";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import { toast } from "react-toastify";
import { StyledMenu } from "../family";

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
      <StyledMenu>
        <StyledPlus
          onClick={() => {
            setModalMode("add");
            setShowModal(true);
          }}
          $right={true}
        />
        <h2>Task Categories</h2>
      </StyledMenu>

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

      <Modal
        $top="7rem"
        setShowModal={setShowModal}
        $open={showModal && modalMode === "add"}
      >
        {showModal && modalMode === "add" && (
          <CategoryForm
            formHeading="Add a category"
            onSubmitCategory={handleAddCategory}
            familyMembers={familyMembers}
            categories={categories}
          />
        )}
      </Modal>
    </>
  );
}
