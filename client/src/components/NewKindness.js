import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewKindness({ user }) {

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(() =>{
    fetch("/categories")
    .then((r) => {
      if (r.ok) {
        r.json().then((category) => setCategories(category));
      }
    });
  },[])


  const {values, errors, touched, handleChange, handleSubmit} = useFormik({
    initialValues: {
        title: "",
        category: "",
        date: "",
        description: ""
    },
    // validationSchema: formSchema,
    onSubmit: () => {
        e.preventDefault();
        setIsLoading(true);
        fetch("/kindnessList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            history.push("/");
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      console.log("submitted")
    }
  })

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Post a Random Act of Kindness</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={values.title}
              onChange={handleChange}
            />
            </FormField>
          <FormField>
            <Label htmlFor="category">Category</Label>
            <select
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}>
                {categories.map(category => {
                    <option value={category}>{category}</option>
                })}
            </select>
          </FormField>
          <FormField>
            <Label htmlFor="date">Date (YYYY-MM-DD)</Label>
            <Input
              type="text"
              id="date"
              value={values.date}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="desciption">Description</Label>
            <Textarea
              id="desciption"
              rows="10"
              value={values.description}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Kindness"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{title}</h1>
        <h2>{category}</h2>
        <p>
          <em>Date: {date}</em>
          &nbsp;·&nbsp;
          <cite>By {user.username}</cite>
        </p>
        <ReactMarkdown>{description}</ReactMarkdown>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewKindness;