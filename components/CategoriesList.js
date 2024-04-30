import styled from "styled-components";
import { useState } from "react";
import DownArrow from "@/public/assets/images/down-arrow.svg";
import UpArrow from "@/public/assets/images/up-arrow.svg";

const StyledList = styled.ul`
  display: flex;
  padding: 0;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem;
  list-style: none;
  margin-bottom: 6rem;
`;

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
  border-radius: 2rem;
  padding: 1rem;
  border: none;
`;

const StyledListOfMembers = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StyledMemberItem = styled.li`
  text-align: left;
`;

const StyledCategory = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyleSpan = styled.span`
  max-width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function CategoriesList({ categories, familyMembers }) {
  const [selected, setSelected] = useState(null);

  function handleExpand(index) {
    if (selected === index) {
      setSelected(null);
      return;
    }
    setSelected(index);
  }
  return (
    <StyledList>
      {categories.map((category, index) => (
        <li key={category.id}>
          <StyledButton onClick={() => handleExpand(index)}>
            <StyledCategory>
              <StyleSpan title={category.category}>
                <strong>{category.category}</strong>
              </StyleSpan>
              {selected === index ? <UpArrow /> : <DownArrow />}
            </StyledCategory>
            <section>
              {selected === index && (
                <StyledListOfMembers>
                  {category.selectedMembers.map((memberId) => (
                    <StyledMemberItem key={memberId}>
                      {
                        familyMembers.find((member) => member.id === memberId)
                          ?.name
                      }
                    </StyledMemberItem>
                  ))}
                </StyledListOfMembers>
              )}
            </section>
          </StyledButton>
        </li>
      ))}
    </StyledList>
  );
}
