import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";
import {useFormik} from "formik";
import '../styles/NewKindness.css'

function NewKindness({ user }) {

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(() =>{
    fetch("/categories")
    .then((r) => {
      if (r.ok) {
        r.json().then((category) => {
            setCategories(category)
            console.log(category)
        })
        
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
    onSubmit: (e) => {
        setIsLoading(true);
        fetch("/kindnessUser", {
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
            r.json().then((err) => setError(err.error));
          }
        });
      console.log("posted", values)
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
                {categories.map((category) => (
                    <option key={category} value={category} label={category}/>
                ))}
            </select>
            {touched.category && errors.category ? (
            <div className="error">{errors.category}</div>
            ) : null}
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
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
            {error.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
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