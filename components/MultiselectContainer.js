import { useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: relative;
  display: inline-block;
  .multiSelectContainer .optionListContainer {
    z-index: ${({ $hidden }) => ($hidden ? "-1" : "2")};
    display: ${({ $hidden }) => ($hidden ? "none" : "block")};
    max-height: 132px;
    overflow: scroll;
  }
`;

const StyledToggleDropdownButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  z-index: 100;
  &:hover {
    background-color: transparent;
  }
`;

export default function MultiselectContainer({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function closeDropdown(event) {
    event.stopPropagation();
    setIsDropdownOpen(false);
  }

  function openDropdown(event) {
    event.stopPropagation();
    setIsDropdownOpen(true);
  }

  return (
    <StyledContainer
      onClick={openDropdown}
      onBlur={closeDropdown}
      $hidden={!isDropdownOpen}
    >
      {children}
      {isDropdownOpen && (
        <StyledToggleDropdownButton type="button" onClick={closeDropdown}>
          ▲
        </StyledToggleDropdownButton>
      )}
      {!isDropdownOpen && (
        <StyledToggleDropdownButton type="button" onClick={openDropdown}>
          ▼
        </StyledToggleDropdownButton>
      )}
    </StyledContainer>
  );
}
