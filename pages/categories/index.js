import StyledBackLink from "@/components/StyledBackLink";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";
import { StyledMessage } from "..";
import Modal from "@/components/Modal";
import CategoriesList from "@/components/CategoriesList";
import CategoryForm from "@/components/CategoryForm";
import Plus from "@/public/assets/images/plus.svg";

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
}) {
  return (
    <>
      <StyledHeading>Task Categories</StyledHeading>

      {!categories.length && (
        <StyledMessage>The list is empty. Add members to begin!</StyledMessage>
      )}
      <CategoriesList categories={categories} familyMembers={familyMembers} />

      <StyledPlus onClick={() => setShowModal(true)} $right={true} />

      {showModal && (
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
