import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";

const StyledHeader = styled.header`
  background-color: var(--color-background);
  color: var(--color-font);
  box-shadow: -1px 6px 15px 0px #7d7d7d;
  text-shadow: 2px 3px 3px #bccbd4;
  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  max-width: 375px;
  margin: auto;
  padding: 0.7rem;
  z-index: 1;
`;

const StyledH1 = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
`;

export default function Header({ isDarkTheme, setDarkTheme }) {
  return (
    <StyledHeader>
      <ThemeToggle isDarkTheme={isDarkTheme} setDarkTheme={setDarkTheme} />
      <StyledH1>ClanPlan</StyledH1>
    </StyledHeader>
  );
}
