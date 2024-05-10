import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 6rem;
`;

const StyledListItems = styled.li`
  border-radius: 2rem;
  padding: 1rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  margin: 0.5rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  background-color: var(--color-background);
  transition: background-color 0.5s ease;
`;

const StyleSpan = styled.span`
  max-width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function FamilyMembersList({ familyMembers }) {
  return (
    <section>
      <StyledList>
        {familyMembers.map((member) => (
          <StyledListItems key={member._id}>
            <StyleSpan title={member.name}>
              <strong>{member.name}</strong>
            </StyleSpan>
            <span>{member.role}</span>
          </StyledListItems>
        ))}
      </StyledList>
    </section>
  );
}
