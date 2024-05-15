import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const StyledListItems = styled.li`
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  margin: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  grid-template-columns: 3fr 1fr;
  background-color: var(--color-background);
  transition: background-color 0.5s ease;
`;

const StyledDate = styled.p`
  font-size: 0.9rem;
`;

const StyledMessage = styled.p`
  font-size: 1.2rem;
`;

export default function Comments({ comments }) {
  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleString("us-US", options);
  }

  return (
    <StyledList>
      {comments?.map((comment) => (
        <StyledListItems key={comment._id}>
          <StyledDate>{formatDate(comment.date)}</StyledDate>
          <StyledMessage>{comment.message}</StyledMessage>
        </StyledListItems>
      ))}
    </StyledList>
  );
}
