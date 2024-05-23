import { useState } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import Multiselect from "multiselect-react-dropdown";
import useSWR from "swr";
import StyledLoadingAnimation from "./StyledLoadingAnimation";
import MultiselectContainer from "./MultiselectContainer";

const StyledHeading = styled.h2`
  align-self: center;
`;

const StyledLabel = styled.label`
  font-size: 0.9rem;
`;

const StyledSpan = styled.span`
  font-size: 1rem;
  color: var(--color-aler);
  float: ${({ $left }) => ($left ? "left" : "right")};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
`;

export default function CategoryForm({
  onSubmitCategory,
  categories,
  formHeading,
  value,
}) {
  const [isValidCategory, setIsValidCategory] = useState(true);
  const [isUniqueCategory, setIsUniqueCategory] = useState(true);
  const [enteredCategory, setEnteredCategory] = useState(value?.title || "");

  const [selectedMembers, setSelectedMembers] = useState(
    value?.selectedMembers || []
  );
  const [isMemberSelected, setIsMemberSelected] = useState(true);

  const { data: familyMembers, isLoading } = useSWR("/api/members");

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!familyMembers) {
    return;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (value) {
      const selectedMembersIds = selectedMembers.map((member) => member._id);
      if (
        data.title === value.title &&
        selectedMembers.length === value.selectedMembers.length &&
        selectedMembers.every((member) =>
          selectedMembersIds.includes(member._id)
        )
      ) {
        alert("No changes were made to the form.");
        return;
      }
    }

    if (!data.title.trim()) {
      setIsValidCategory(false);
      event.target.title.focus();
      return;
    } else {
      setIsValidCategory(true);
      const uniqueCategoryCheck =
        data.title.trim() === value?.title.trim() ||
        !categories.find(
          (category) =>
            category.title.trim().toUpperCase() ===
            data.title.trim().toUpperCase()
        );

      if (!uniqueCategoryCheck) {
        setIsUniqueCategory(uniqueCategoryCheck);
        return;
      }
    }

    if (!selectedMembers.length > 0) {
      setIsMemberSelected(false);
      return;
    } else {
      setIsMemberSelected(true);
    }
    onSubmitCategory({
      title: data.title.trim(),
      selectedMembers,
      id: value?._id,
    });
  }

  function handleChange(event) {
    setEnteredCategory(event.target.value);
    setIsUniqueCategory(true);
    setIsValidCategory(true);
  }

  function onSelect(selectedList) {
    setSelectedMembers(selectedList);
  }

  function onRemove(_selectedList, removedItem) {
    setSelectedMembers(
      selectedMembers.filter((member) => member._id !== removedItem._id)
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledHeading>{formHeading}</StyledHeading>
      <StyledLabel htmlFor="title">
        <StyledSpan $left={true}>*</StyledSpan>Title:
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
        name="title"
        id="title"
        onChange={handleChange}
        maxLength={50}
        defaultValue={value?.title}
      />
      <StyledSpan>{50 - enteredCategory.length} characters left</StyledSpan>

      <StyledLabel htmlFor="members">
        <StyledSpan $left={true}>*</StyledSpan>
        Members
        {!isMemberSelected && <StyledSpan>Please select a member!</StyledSpan>}
      </StyledLabel>
      <MultiselectContainer>
        <Multiselect
          options={familyMembers}
          onSelect={onSelect}
          onRemove={onRemove}
          displayValue="name"
          showCheckbox={true}
          keepSearchTerm={true}
          emptyRecordMsg="No members found"
          placeholder="Please select a member"
          avoidHighlightFirstOption={true}
          selectedValues={selectedMembers}
          style={{
            searchBox: {
              paddingRight: "25px",
            },
          }}
        />
      </MultiselectContainer>
      <StyledButton>{value ? "Update" : "Add"}</StyledButton>
    </StyledForm>
  );
}
