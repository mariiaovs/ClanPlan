import Link from "next/link";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 6rem;

  @media (min-width: 900px), (min-width: 1200px), (min-width: 1536px) {
    margin-left: 6rem;
  }
`;

const StyledListItems = styled.li`
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  margin: 0.5rem;
  background-color: var(--color-background);
  transition: background-color 0.5s ease;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: space-between;
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
            <StyledLink href={`/family/${member._id}`}>
              <StyleSpan title={member.name}>
                <strong>{member.name}</strong>
              </StyleSpan>
              <span>{member.role}</span>
            </StyledLink>
          </StyledListItems>
        ))}
      </StyledList>
    </section>
  );
}
