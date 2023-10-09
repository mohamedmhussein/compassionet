import { useEffect, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

function CommentList({ kindnessId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the given kindnessId
    fetch(`/comments/${kindnessId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [kindnessId]);

  return (
    <CommentContainer>
      <h4>Comments</h4>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id}>
            <CommentUser>
              Posted by: {comment.user}
            </CommentUser>
            <CommentText>
              <ReactMarkdown>{comment.text}</ReactMarkdown>
            </CommentText>
          </Comment>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  margin-top: 16px;
  border-top: 1px solid #ccc;
  padding-top: 16px;
`;

const Comment = styled.div`
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
`;

const CommentUser = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const CommentText = styled.div`
  font-size: 14px;
`;

export default CommentList;

