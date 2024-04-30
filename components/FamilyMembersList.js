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
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
  margin: 0.5rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  background-color: white;
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
          <StyledListItems key={member.id}>
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
