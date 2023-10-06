import React, { useState } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import {useFormik} from "formik";
import * as yup from "yup";

function SignUpForm({ onLogin }) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordConfirmation, setPasswordConfirmation] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  // const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = yup.object().shape({
    username: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required("You must enter a username"),
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
  
  const formik = useFormik({
    initialValues: {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        imageUrl: "",
        bio: ""
    },
    onSubmit: () => {

    }
  })



  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          id="email"
          autoComplete="off"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password Confirmation</Label>
        <Input
          type="password"
          id="password_confirmation"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
      </FormField>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default SignUpForm;