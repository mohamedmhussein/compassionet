import React, { useState } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import {useFormik} from "formik";
import * as yup from "yup";
import "../styles/SignUp.css"

function SignUpForm({ onLogin }) {

  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = yup.object().shape({
    username: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required("You must enter a username")
    .trim()
    .matches(/^\S*$/, 'No spaces are allowed'),
    firstName: yup
    .string()
    .min(3, 'Too Short')
    .required("You must enter a first name"),
    lastName: yup
    .string()
    .min(3, 'Too Short')
    .required("You must enter a last name"),
    email: yup
    .string()
    .required("")
    .email("You must enter a valid email"),
    password: yup
    .string()
    .required("Must enter a name")
    .min(5),
    passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required("You must confirm the entered password")
  });
  
  const {values, errors, touched, handleChange, handleSubmit} = useFormik({
    initialValues: {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        firstName: "",
        lastName: "",
        imageUrl: "",
    },
    validationSchema: formSchema,
    onSubmit: () => {

      fetch("/signup", {
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
          className={errors.username  ? "input-error" : ""}
        />
        {errors.username  ? <Error>{errors.username}</Error> : ""}
      </FormField>
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          id="email"
          autoComplete="off"
          value={values.email}
          onChange={handleChange}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email ? <Error>{errors.email}</Error> : ""}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          autoComplete="current-password"
          className={errors.password ? "input-error" : ""}
        />
        {errors.password ? <Error>{errors.password}</Error> : ""}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password Confirmation</Label>
        <Input
          type="password"
          id="passwordConfirmation"
          value={values.passwordConfirmation}
          onChange={handleChange}
          autoComplete="off"
          className={errors.passwordConfirmation  ? "input-error" : ""}
        />
        {errors.passwordConfirmation ? <Error>{errors.passwordConfirmation}</Error> : ""}
      </FormField>
      <FormField>
        <Label htmlFor="firsName">First name</Label>
        <Input
          type="text"
          id="firstName"
          value={values.firstName}
          onChange={handleChange}
          autoComplete="off"
          className={errors.firstName ? "input-error" : ""}
        />
        {errors.firstName ? <Error>{errors.firstName}</Error> : ""}
      </FormField>
      <FormField>
        <Label htmlFor="LastName">Last name</Label>
        <Input
          type="text"
          id="lastName"
          value={values.lastName}
          onChange={handleChange}
          autoComplete="off"
          className={errors.lastName ? "input-error" : ""}
        />
        {errors.lastName ? <Error>{errors.lastName}</Error> : ""}
      </FormField>
      <FormField>
      <Label htmlFor="imageUrl">Profile Image URL</Label>
        <Input
          type="text"
          id="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          autoComplete="off"
        />
      </FormField>
      <FormField>
        <Button type="submit">{isLoading ?"Loading..." : "Sign Up"}</Button>
      </FormField>
      <FormField>
        {error.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default SignUpForm;