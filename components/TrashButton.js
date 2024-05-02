import styled from "styled-components";
import Trash from "@/public/assets/images/trash-icon.svg";

const StyledButton = styled.button`
  width: 2.3rem;
  position: absolute;
  top: 1rem;
  right: 1.3rem;
  background: none;
  border: none;
`;

export default function TrashButton({ onTrashButtonClick }) {
  return (
    <StyledButton onClick={onTrashButtonClick}>
      <Trash />
    </StyledButton>
  );
}
