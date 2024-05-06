import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust height according to your UI */
`;

const StyledLoadingSpinner = styled.div`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  border: 4px solid rgba(0, 0, 0, 0.245);
  border-left-color: #729290;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
`;

export default function StyledLoadingAnimation() {
  return (
    <StyledDiv>
      <StyledLoadingSpinner />
    </StyledDiv>
  );
}
