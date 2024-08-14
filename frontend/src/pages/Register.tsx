import {Box, Button, TextField, Typography} from "@mui/material";
import AuthService from "../services/AuthService.service";
import {RegisterRequest} from "../models/RegisterRequest";
import {Formik} from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useState } from "react";

export default function Register(){

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authService = new AuthService();

  const initialValues = {
    password: "",
    confirmedPassword: "",
    email: ""
  };

  const handleFormSubmit = (values: any) => {
    
    setIsLoading(true);

    const registerRequest: RegisterRequest = {
            password: values.confirmedPassword,
            email: values.email,
            role: "ROLE_USER"
        };

    authService.signup(registerRequest); 
  };

  const checkoutSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Required'),
    password: yup.string().required('Required'),
    confirmedPassword: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Required')

  });



    return(

      <>
      {isLoading? <Loading/> :
        <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      p={3}
    >
      <Box
        width={{ xs: '90%', sm: '400px' }}
        bgcolor="transparent"
        p={3}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography variant="h4" align="center" gutterBottom>
                  Register
                </Typography>
              </Box>
              <Box mb={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  type="password"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Confirm Password"
                  type="password"
                  name="confirmedPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmedPassword}
                  error={!!touched.confirmedPassword && !!errors.confirmedPassword}
                  helperText={touched.confirmedPassword && errors.confirmedPassword}
                />
              </Box>
              <Box display="flex" justifyContent="center" mb={2}>
                <Button type="submit" color="secondary" variant="contained">
                  Register
                </Button>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="body2">
                  Already have an existing account? <Link
                  to={"/login"}
                  >
                  Login Here
                  </Link>
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>}
      </>
    );
}