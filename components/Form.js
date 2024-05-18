import { useState } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import Multiselect from "multiselect-react-dropdown";
import Modal from "./Modal";
import ConfirmBox from "./ConfirmBox";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  background-color: var(--color-background);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  transition: background-color 0.5s ease;
`;

const StyledHeading = styled.h2`
  align-self: center;
`;

const StyledLabel = styled.label`
  font-size: 0.9rem;
`;

const StyledSpan = styled.span`
  font-size: 1rem;
  color: red;
  float: ${({ $left }) => ($left ? "left" : "right")};
`;

const StyledDateInput = styled.input`
  color-scheme: var(--color-scheme-date);
`;

const StyledSelect = styled.select`
  padding: 0.3rem;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

export default function Form({
  onTaskSubmit,
  onTasksSubmit,
  title,
  value,
  isEdit,
  allocatedMembersList,
  categories,
  familyMembers,
  setShowModal,
  showModal,
}) {
  const [enteredTitle, setEnteredTitle] = useState(value?.title || "");
  const [isValid, setIsValid] = useState(true);
  const [allocatedMembers, setAllocatedMembers] = useState(
    allocatedMembersList || familyMembers
  );
  const [assignedTo, setAssignedTo] = useState(value?.assignedTo || []);

  const formattedTodayDate = new Date().toISOString().substring(0, 10);
  const [taskToUpdate, setTaskToUpdate] = useState();
  const [displayEndDate, setDisplayEndDate] = useState(false);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [endDate, setEndDate] = useState(value?.endDate);

  const date = new Date(value?.dueDate);

  const firstDay =
    value?.dueDate &&
    new Date(date.getFullYear(), date.getMonth(), 2)
      .toISOString()
      .substring(0, 10);

  const lastDay =
    value?.dueDate &&
    new Date(date.getFullYear(), date.getMonth() + 1, 1)
      .toISOString()
      .substring(0, 10);

  function handleTitleChange(event) {
    setEnteredTitle(event.target.value);
    setIsValid(true);
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
        data.repeat === value.repeat &&
        data.endDate === value.endDate &&
        assignedTo.every((member) => assignedMembersIds.includes(member._id))
      ) {
        alert("No changes were made to the form.");
        return;
      }
    }

    if (!data.title.trim()) {
      setIsValid(false);
      event.target.title.focus();
      return;
    }

    if (
      !isEdit &&
      (data.repeat === "monthly" ||
        data.repeat === "weekly" ||
        data.repeat === "daily") &&
      !data.endDate
    ) {
      setIsEndDateValid(false);
      event.target.endDate.focus();
      return;
    }

    if (isEdit) {
      const updatedTask = {
        ...data,
        title: data.title.trim(),
        id: value._id,
        groupId: value.groupId,
        assignedTo,
        isDone: value.isDone,
        category: data.category === "" ? null : data.category,
        endDate: value.endDate,
        startDate: value.startDate,
      };

      if (value?.groupId) {
        setShowModal(true);
        setTaskToUpdate(updatedTask);
      } else {
        onTaskSubmit(updatedTask);
      }
    } else {
      onTaskSubmit({
        ...data,
        title: data.title.trim(),
        assignedTo,
        category: data.category === "" ? null : data.category,
        startDate: data.dueDate,
      });
    }
  }

  function handleUpdateOneTask() {
    onTaskSubmit(taskToUpdate);
    setShowModal(false);
  }

  function handleUpdateTasks(action) {
    onTasksSubmit(taskToUpdate, action);
    setShowModal(false);
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

  function handleRepeat(event) {
    const repeat = event.target.value;
    if (repeat === "monthly" || repeat === "weekly" || repeat === "daily") {
      setDisplayEndDate(true);
    } else {
      setDisplayEndDate(false);
      setEndDate("");
    }
  }
  function handleEndDate(event) {
    setEndDate(event.target.value);
    setIsEndDateValid(true);
  }

  return (
    <>
      {showModal && isEdit && (
        <Modal $top="13.5rem" setShowModal={setShowModal} $open={true}>
          <ConfirmBox
            setShowModal={setShowModal}
            onConfirm={handleUpdateOneTask}
            onConfirmFutherTasks={() => handleUpdateTasks("future")}
            onConfirmAllTasks={() => handleUpdateTasks("all")}
            id={value._id}
            groupId={value.groupId}
            message={
              value.groupId
                ? "Are you sure you want to update?"
                : "Are you sure you want to update this task?"
            }
          />
        </Modal>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeading>{title}</StyledHeading>
        <StyledLabel htmlFor="title">
          <StyledSpan $left={true}>*</StyledSpan>Title:
          {!isValid && <StyledSpan>Please enter valid title!</StyledSpan>}
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
          min={
            isEdit &&
            (value?.repeat.includes("monthly") ||
              value?.repeat.includes("weekly") ||
              value?.repeat.includes("daily"))
              ? firstDay
              : formattedTodayDate
          }
          max={
            isEdit &&
            (value?.repeat.includes("monthly") ||
              value?.repeat.includes("weekly") ||
              value?.repeat.includes("daily")) &&
            lastDay
          }
          defaultValue={value?.dueDate || formattedTodayDate}
        ></StyledDateInput>

        <StyledLabel htmlFor="repeat">Repeat:</StyledLabel>
        <StyledSelect
          id="repeat"
          name="repeat"
          defaultValue={value?.repeat}
          onChange={handleRepeat}
        >
          <option value="none">Don&apos;t repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </StyledSelect>
        {!isEdit && displayEndDate && (
          <>
            <StyledLabel htmlFor="endDate">
              Until:
              {!isEndDateValid && (
                <StyledSpan>Please pick end date!</StyledSpan>
              )}
            </StyledLabel>
            <StyledDateInput
              type="date"
              id="endDate"
              name="endDate"
              min={formattedTodayDate}
              defaultValue={endDate}
              onChange={handleEndDate}
            ></StyledDateInput>
          </>
        )}

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
    </>
  );
}
