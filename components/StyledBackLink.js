import styled from "styled-components";
import Link from "next/link";

const StyledBackLink = styled(Link)`
  position: fixed;
  top: 0.7rem;
  left: calc(50% - 170px);
  z-index: 2;

  @media (min-width: 900px) {
    left: 13%;
  }
  @media (min-width: 1200px) {
    left: 10%;
  }
  @media (min-width: 1536px) {
    left: 8%;
  }
`;

export default StyledBackLink;
