import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import "../styles/KindnessList.css"

function KindnessList() {
  const [kindnesses, setKindnesses] = useState([]);

  useEffect(() => {
    fetch("/kindnessUser")
      .then((r) => r.json())
      .then(kindnesses => setKindnesses(kindnesses));
  }, []);

    function handleDelete(id){
        console.log(kindnesses)
        // Delete request
        fetch(`/kindnessUser/${id}`, {
          method: "DELETE",
        })
          .then((r) => {
            if (r.ok) {
              setKindnesses((prevKindnesses) =>
                prevKindnesses.filter((kindness) => kindness.id !== id)
              );
            }
          })
          .catch((error) => {
            console.error("Error deleting kindness:", error);
          });
      };

  return (
    <div>
      {kindnesses.length > 0 ? (
        kindnesses.map((kindness) => (
          <Kindness key={kindness.id}>
            <Box>
              <h2>{kindness.title}</h2>
              <h3>{kindness.category}</h3>
              <p>
                <em>Date: {kindness.date} </em>
                &nbsp;·&nbsp;
                <cite>By {kindness.performer}</cite>
              </p>
              <ReactMarkdown>{kindness.description}</ReactMarkdown>
              <ButtonContainer>
                <Button
                //   as={Link}
                  to={`/edit/${kindness.id}`}
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                //   as={Link}
                  onClick={() => handleDelete(kindness.id)}
                  color="primary"
                >
                  Delete
                </Button>
              </ButtonContainer>
            </Box>
          </Kindness>
        ))
      ) : (
        <>
          <h2>No Acts of Kindness Found</h2>
          <Button as={Link} to="/new">
            Post a New Act of Kindness
          </Button>
        </>
      )}
    </div>
  );
}


const Kindness = styled.article`
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export default KindnessList;