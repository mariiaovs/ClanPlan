import styled from "styled-components";

const StyledButton = styled.button`
  margin-top: 1rem;
  color: var(--color-font);
  font-weight: 700;
  border: 0.5px solid var(--color-font);
  border-bottom: 2px solid var(--color-font);
  background-color: ${({ $clear }) =>
    $clear ? "var(--color-alert)" : "var(--color-button)"};
  padding: 0.4rem;
  width: ${({ $width }) => ($width ? $width : "6rem")};
  align-self: center;
  border-radius: 0.7rem;
  ${({ $clear }) =>
    $clear &&
    `position: absolute;
  margin-top: 0.5rem;
  right: 0.5rem;`}
`;

export default StyledButton;
