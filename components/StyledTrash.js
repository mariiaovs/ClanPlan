import styled from "styled-components";
import Trash from "@/public/assets/images/trash-icon.svg";

const StyledTrash = styled(Trash)`
  width: 1.5rem;
  position: absolute;
  top: 15px;
  right: 20px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default StyledTrash;
