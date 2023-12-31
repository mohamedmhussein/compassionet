import React, { useState } from "react";
import { Button, Error, Input, FormField, Label } from "../styles";
import {useFormik} from "formik";

function LoginForm({ onLogin }) {
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {values, handleChange, handleSubmit} = useFormik({
    initialValues: {
        username: "",
        password: "",
    },
    onSubmit: () => {

      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
          console.log(user)
          onLogin(user)
            }
          );
        } else {
          r.json().then((err) => setError(err.error));
        }

      })
      console.log("submitted")
    }
  })
  
  
  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={values.username}
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Button variant="fill" color="primary" type="submit">
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </FormField>
      <FormField>
        {error.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default LoginForm;
