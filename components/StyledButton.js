import styled from "styled-components";

const StyledButton = styled.button`
  ${({ $left }) => $left && `margin-left: ${$left};`}
  margin-top: 1rem;
  color: var(--color-font);
  font-weight: 700;
  border: none;
  background-color: ${({ $clear }) => ($clear ? "red" : "var(--color-button)")};
  padding: 0.4rem;
  width: ${({ $width }) => ($width ? $width : "6rem")};
  align-self: center;
  border-radius: 0.7rem;
  ${({ $clear }) =>
    $clear &&
    `position: absolute;
  margin-top: 0;
  right: 0.5rem;`}
`;

export default StyledButton;
