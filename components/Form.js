import { useState } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import Multiselect from "multiselect-react-dropdown";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  margin-top: 6rem;
  background-color: var(--color-background);
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 4.5rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);
`;

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

const StyledDateInput = styled.input`
  color-scheme: dark;
`;

const StyledSelect = styled.select`
  padding: 0.3rem;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function Form({
  onTaskSubmit,
  title,
  value,
  isEdit,
  allocatedMembersList,
  categories,
  familyMembers,
}) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [allocatedMembers, setAllocatedMembers] = useState(
    allocatedMembersList || familyMembers
  );
  const [assignedTo, setAssignedTo] = useState(value?.assignedTo || []);

  const formattedTodayDate = new Date().toISOString().substring(0, 10);

  function handleTitleChange(event) {
    setEnteredTitle(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (value) {
      const assignedMembersIds = assignedTo.map((member) => member._id);
      if (
        data.title.trim() === value.title &&
        (data.category == value.category?._id ||
          (data.category === "" && value.category === null)) &&
        data.dueDate === value.dueDate &&
        data.priority === value.priority &&
        assignedTo.length === value.assignedTo.length &&
        assignedTo.every((member) => assignedMembersIds.includes(member._id))
      ) {
        alert("No changes were made to the form.");
        return;
      }
    }

    if (!data.title.trim()) {
      setIsValid(true);
      event.target.title.focus();
      return;
    }

    if (isEdit) {
      onTaskSubmit({
        ...data,
        title: data.title.trim(),
        id: value.id,
        assignedTo,
        isDone: value.isDone,
        category: data.category === "" ? null : data.category,
      });
    } else {
      onTaskSubmit({
        ...data,
        title: data.title.trim(),
        assignedTo,
        category: data.category === "" ? null : data.category,
      });
    }
  }

  function handleFamilyMembersSelection(event) {
    setAssignedTo([]);
    const selectedCategoryId = event.target.value;

    let associatedMembers = [];

    if (selectedCategoryId) {
      associatedMembers = categories.find(
        (category) => category._id === selectedCategoryId
      )?.selectedMembers;
    } else {
      associatedMembers = familyMembers;
    }
    setAllocatedMembers(associatedMembers);
  }

  function onSelect(selectedList) {
    setAssignedTo(selectedList);
  }

  function onRemove(_selectedList, removedItem) {
    setAssignedTo(
      assignedTo.filter((member) => member._id !== removedItem._id)
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledHeading>{title}</StyledHeading>
      <StyledLabel htmlFor="title">
        <StyledSpan $left={true}>*</StyledSpan>Title:
        {isValid && <StyledSpan>Please enter valid title!</StyledSpan>}
      </StyledLabel>
      <input
        type="text"
        id="title"
        name="title"
        maxLength="150"
        onChange={handleTitleChange}
        defaultValue={value?.title}
      ></input>
      <StyledSpan>{150 - enteredTitle.length} characters left</StyledSpan>
      <StyledLabel htmlFor="category">Category:</StyledLabel>
      <StyledSelect
        id="category"
        name="category"
        defaultValue={value?.category?._id}
        onChange={handleFamilyMembersSelection}
      >
        <option value="">
          {categories.length
            ? "Please select a category"
            : "No categories added"}
        </option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.title}
          </option>
        ))}
      </StyledSelect>
      <StyledLabel htmlFor="priority">Priority:</StyledLabel>
      <StyledDiv>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </StyledDiv>
      <input
        type="range"
        id="priority"
        name="priority"
        defaultValue={isEdit ? value?.priority : "1"}
        min="1"
        max="3"
      ></input>
      <StyledLabel htmlFor="dueDate">Due date:</StyledLabel>
      <StyledDateInput
        type="date"
        id="dueDate"
        name="dueDate"
        min={formattedTodayDate}
        defaultValue={value?.dueDate}
      ></StyledDateInput>
      <StyledLabel htmlFor="assignedTo">Assign to:</StyledLabel>
      <Multiselect
        id="assignedTo"
        options={allocatedMembers}
        onSelect={onSelect}
        onRemove={onRemove}
        displayValue="name"
        showCheckbox={true}
        keepSearchTerm={true}
        showArrow={true}
        emptyRecordMsg={
          familyMembers.length
            ? "No members added to the category"
            : "No members added to the family"
        }
        placeholder="Select Family Member"
        avoidHighlightFirstOption={true}
        selectedValues={assignedTo}
      />
      <StyledButton>{isEdit ? "Update" : "Create"}</StyledButton>
    </StyledForm>
  );
}
