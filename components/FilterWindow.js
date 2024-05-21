import styled from "styled-components";
import StyledButton from "./StyledButton";
import { useRouter } from "next/router";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  background-color: var(--color-background);
  padding: 1rem;
  position: relative;
`;

const StyledHeading = styled.h2`
  align-self: left;
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled.label`
  font-size: 1.2rem;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSelect = styled.select`
  padding: 0.3rem;
`;

export default function FilterWindow({
  onApply,
  familyMembers,
  filters,
  categories,
}) {
  const router = useRouter();
  const { listType } = router.query;
  function handleApplyFilter(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onApply(data);
  }

  function handleReset(event) {
    event.preventDefault();
    event.target.reset();
    event.target.elements.priority.value = "0";
    event.target.elements.category.value = "";
    event.target.elements.member.value = "";
  }

  return (
    <StyledForm onSubmit={handleApplyFilter} onReset={handleReset}>
      <StyledHeading>Filter</StyledHeading>
      <StyledButton $clear type="reset">
        Clear all
      </StyledButton>
      <StyledLabel htmlFor="priority">Priority:</StyledLabel>
      <StyledDiv>
        <span>none</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </StyledDiv>
      <input
        type="range"
        id="priority"
        name="priority"
        min="0"
        max="3"
        defaultValue={filters.priority || "0"}
      />
      <StyledLabel htmlFor="category">Category:</StyledLabel>
      <StyledSelect
        id="category"
        name="category"
        defaultValue={filters.category}
      >
        <option value="">Choose a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.title}
          </option>
        ))}
      </StyledSelect>
      {listType !== "notAssigned" && (
        <>
          <StyledLabel htmlFor="member">Assigned member:</StyledLabel>
          <StyledSelect id="member" name="member" defaultValue={filters.member}>
            <option value="">Choose a member</option>
            {familyMembers.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </StyledSelect>
        </>
      )}

      <StyledButton type="submit">Apply</StyledButton>
    </StyledForm>
  );
}
