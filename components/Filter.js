import FilterWindow from "./FilterWindow";
import Modal from "./Modal";
import StyledButton from "./StyledButton";
import FilterIcon from "@/public/assets/images/filter.svg";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const StyledClearFilterButton = styled.button`
  color: white;
  font-weight: 700;
  background-color: var(--color-font);
  border-radius: 0.7rem;
`;

export default function Filter({
  showModal,
  setShowModal,
  familyMembers,
  onApplyFilters,
  filters,
  categories,
  onDeleteFilterOption,
}) {
  return (
    <>
      {showModal && (
        <Modal $top="5rem" setShowModal={setShowModal}>
          <FilterWindow
            familyMembers={familyMembers}
            onApply={onApplyFilters}
            filters={filters}
            categories={categories}
          />
        </Modal>
      )}

      <StyledButton
        $width="4rem"
        $left="0.5rem"
        onClick={() => setShowModal(true)}
      >
        <FilterIcon />
      </StyledButton>

      <StyledList>
        {Object.keys(filters).map(
          (key) =>
            Number(filters[key]) !== 0 && (
              <StyledClearFilterButton
                onClick={() => onDeleteFilterOption(key)}
                key={key}
              >
                ❌ {key}:{" "}
                {key === "member"
                  ? familyMembers.find((member) => member._id === filters[key])
                      .name
                  : key === "category"
                  ? categories.find((category) => category._id === filters[key])
                      .title
                  : filters[key]}
              </StyledClearFilterButton>
            )
        )}
      </StyledList>
    </>
  );
}
