import Plus from "@/public/assets/images/plus.svg";
import styled from "styled-components";

const StyledPlus = styled(Plus)`
  width: 3rem;
  fill: var(--color-background);
  cursor: pointer;
  stroke: var(--color-font);
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }

  @media (min-width: 900px), (min-width: 1200px), (min-width: 1536px) {
    left: 10rem;
  }
`;

export default StyledPlus;
