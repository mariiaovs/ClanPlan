import { useState } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import Multiselect from "multiselect-react-dropdown";

const StyledHeading = styled.h2`
  align-self: center;
`;

const StyledLabel = styled.label`
  font-size: 1.2rem;
`;

const StyledSpan = styled.span`
  font-size: 1rem;
  color: red;
  float: ${({ $left }) => ($left ? "left" : "right")};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
`;

export default function CategoryForm({
  onAddCategory,
  familyMembers,
  categories,
}) {
  const [isValidCategory, setIsValidCategory] = useState(true);
  const [isUniqueCategory, setIsUniqueCategory] = useState(true);
  const [enteredCategory, setEnteredCategory] = useState("");

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isMemberSelected, setIsMemberSelected] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (!data.category.trim()) {
      setIsValidCategory(false);
      event.target.category.focus();
      return;
    } else {
      setIsValidCategory(true);
      const uniqueCategoryCheck = categories.find(
        (category) =>
          category.category.trim().toUpperCase() ===
          data.category.trim().toUpperCase()
      );

      if (uniqueCategoryCheck) {
        setIsUniqueCategory(!uniqueCategoryCheck);
        return;
      }
    }

    if (!selectedMembers.length > 0) {
      setIsMemberSelected(false);
      return;
    } else {
      setIsMemberSelected(true);
    }
    onAddCategory({ ...data, selectedMembers });
  }

  function handleChange(event) {
    setEnteredCategory(event.target.value);
    setIsUniqueCategory(true);
    setIsValidCategory(true);
  }

  function onSelect(selectedList) {
    const selectedMemberIds = selectedList.map((member) => member.id);
    setSelectedMembers([...selectedMemberIds]);
  }

  function onRemove(removedItem) {
    setSelectedMembers(
      selectedMembers.filter((member) => member !== removedItem.id)
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledHeading>Add a new category</StyledHeading>
      <StyledLabel htmlFor="category">
        <StyledSpan $left={true}>*</StyledSpan>Name:
        {!isValidCategory && (
          <StyledSpan>Please enter valid category!</StyledSpan>
        )}
        {!isUniqueCategory && (
          <StyledSpan>
            Category already exists. Please choose another name.
          </StyledSpan>
        )}
      </StyledLabel>
      <input
        type="text"
        name="category"
        id="category"
        onChange={handleChange}
        maxLength={50}
      ></input>
      <StyledSpan>{50 - enteredCategory.length} characters left</StyledSpan>

      <StyledLabel htmlFor="members">
        <StyledSpan $left={true}>*</StyledSpan>
        Members
        {!isMemberSelected && <StyledSpan>Please select a member!</StyledSpan>}
      </StyledLabel>
      <Multiselect
        options={familyMembers}
        onSelect={onSelect}
        onRemove={onRemove}
        displayValue="name"
        showCheckbox={true}
        keepSearchTerm={true}
        showArrow={true}
        emptyRecordMsg="No members added to the family"
        placeholder="Please select a member"
        avoidHighlightFirstOption={true}
      />
      <StyledButton>Add</StyledButton>
    </StyledForm>
  );
}
