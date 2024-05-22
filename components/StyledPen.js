import Pen from "@/public/assets/images/edit-pen-icon.svg";
import styled from "styled-components";

const StyledPen = styled(Pen)`
  width: ${({ $small }) => ($small ? "1rem" : "1.5rem")};
  position: absolute;
  top: 16px;
  right: 60px;
  fill: var(--color-font);
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default StyledPen;
