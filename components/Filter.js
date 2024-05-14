import FilterWindow from "./FilterWindow";
import Modal from "./Modal";
import StyledButton from "./StyledButton";
import FilterIcon from "@/public/assets/images/filter.svg";
import styled from "styled-components";

const StyledFilterSection = styled.section`
  position: relative;
`;

const StyledFilterButton = styled(StyledButton)`
  position: absolute;
  right: 1rem;
  top: -3.3rem;
  padding: 0.1rem 0.4rem;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const StyledClearFilterButton = styled.button`
  font-size: 0.8rem;
  color: var(--color-font);
  font-weight: 700;
  background-color: var(--color-background);
  border: 0.5px solid var(--color-font);
  border-radius: 0.7rem;
  padding: 0.2rem 0.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 250px;
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
    <StyledFilterSection>
      <Modal $top="6rem" setShowModal={setShowModal} $open={showModal}>
        {showModal && (
          <FilterWindow
            familyMembers={familyMembers}
            onApply={onApplyFilters}
            filters={filters}
            categories={categories}
          />
        )}
      </Modal>
      <StyledFilterButton $width="2.5rem" onClick={() => setShowModal(true)}>
        <FilterIcon />
      </StyledFilterButton>

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
    </StyledFilterSection>
  );
}
