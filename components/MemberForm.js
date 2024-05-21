import { useState } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";

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

const StyledSelect = styled.select`
  padding: 0.3rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  background-color: var(--color-background);
  padding: 1rem;
  border-radius: 1rem;
`;

export default function MemberForm({ onAddMember, familyMembers }) {
  const [isValidName, setIsValidName] = useState(true);
  const [isValidRole, setIsValidRole] = useState(true);
  const [isUniqueName, setIsUniqueName] = useState(true);
  const [enteredName, setEnteredName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (!data.name.trim()) {
      setIsValidName(false);
      event.target.name.focus();
      return;
    } else {
      setIsValidName(true);
      const uniqueNameCheck = familyMembers.find(
        (member) =>
          member.name.trim().toUpperCase() === data.name.trim().toUpperCase()
      );

      if (uniqueNameCheck) {
        setIsUniqueName(!uniqueNameCheck);
        return;
      }
    }

    if (!data.role) {
      setIsValidRole(false);
      event.target.role.focus();
      return;
    }

    onAddMember(data);
  }

  function handleChange(event) {
    setEnteredName(event.target.value);
    setIsUniqueName(true);
    setIsValidName(true);
    setIsValidRole(true);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledHeading>Add new family member</StyledHeading>
      <StyledLabel htmlFor="name">
        <StyledSpan $left={true}>*</StyledSpan>Name:
        {!isValidName && <StyledSpan>Please enter valid Name!</StyledSpan>}
        {!isUniqueName && (
          <StyledSpan>Member with this name already exists</StyledSpan>
        )}
      </StyledLabel>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        maxLength={50}
      />
      <StyledSpan>{50 - enteredName.length} characters left</StyledSpan>

      <StyledLabel htmlFor="role">
        <StyledSpan $left={true}>*</StyledSpan>Role
        {!isValidRole && <StyledSpan>Please select a role!</StyledSpan>}
      </StyledLabel>
      <StyledSelect name="role" id="role" onChange={handleChange}>
        <option value="">Please select a role</option>
        <option value="Parent">Parent</option>
        <option value="Child">Child</option>
        <option value="Caregiver">Caregiver</option>
      </StyledSelect>

      <StyledButton>Add</StyledButton>
    </StyledForm>
  );
}
