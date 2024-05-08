import styled from "styled-components";
import Sun from "@/public/assets/images/sun.svg";
import Moon from "@/public/assets/images/moon.svg";

const ToggleLabel = styled.label`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleCheckbox = styled.input`
  appearance: none;
  width: 60px;
  height: 30px;
  background-color: var(--color-font);
  border-radius: 20px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:before {
    content: "";
    border: 0.5px solid var(--color-font);
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--color-background);
    transition: transform 0.3s ease;
    transform: ${({ checked }) =>
      checked ? "translateX(30px)" : "translateX(0)"};
  }
`;

const SunIcon = styled(Sun)`
  color: #344648;
  fill: #344648;
  position: absolute;
  top: 3px;
  left: 3px;
`;

const MoonIcon = styled(Moon)`
  color: #ffffff;
  fill: #ffffff;
  position: absolute;
  top: 6px;
  right: 6px;
`;

export default function ThemeToggle({ isDarkTheme, setDarkTheme }) {
  return (
    <ToggleLabel htmlFor="theme-toggle" $dark={isDarkTheme}>
      <ToggleCheckbox
        type="checkbox"
        id="theme-toggle"
        onChange={() => setDarkTheme(!isDarkTheme)}
        checked={isDarkTheme}
      />
      <SunIcon />
      <MoonIcon />
    </ToggleLabel>
  );
}
