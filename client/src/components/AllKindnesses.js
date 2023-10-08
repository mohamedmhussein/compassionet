import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import "../styles/KindnessList.css"

function KindnessList() {
  const [kindnesses, setKindnesses] = useState([]);

  useEffect(() => {
    fetch("/allKindnesses")
      .then((r) => r.json())
      .then(kindnesses => {
        console.log(kindnesses)
        setKindnesses(kindnesses)});
  }, []);

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

// const Wrapper = styled.section`
//   max-width: 800px;
//   margin: 40px auto;
// `;

const Kindness = styled.article`
  margin-bottom: 24px;
`;

export default KindnessList;
