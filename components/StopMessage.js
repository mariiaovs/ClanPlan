import styled from "styled-components";

const StyledMessage = styled.p`
  font-size: 1.3rem;
  text-align: center;
  padding-top: 5rem;
  font-weight: 700;
`;

export default function StopMessage() {
  return (
    <StyledMessage>
      You are not logged in! <br />
      Please log in.
    </StyledMessage>
  );
}
