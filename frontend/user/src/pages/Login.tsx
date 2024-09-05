import {LoginRequest} from "../models/LoginRequest";
import AuthService from "../services/AuthService.service";
import {Formik} from "formik";
import * as yup from "yup"
import {Box, Button, TextField, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import {useState} from "react";
import Loading from "../components/Loading";

export default function Login(){

    const theme = useTheme();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const authService = new AuthService();

    const initialValues: LoginRequest = {
        email: "",
        password: ""
    }

    const handleFormSubmit = (values: LoginRequest) => {
        setIsLoading(true);
        authService.login(values);
    };

    const checkoutSchema = yup.object().shape({
        password: yup.string().required("required"),
        email: yup.string().email("Invalid email format").required("required")

    });

    return(

      <>
      
      { isLoading? <Loading/> :
        <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor={theme.palette.background.default}
      p={3}
    >
      <Box
        width={{ xs: '90%', sm: '400px' }}
        bgcolor="transparent"
        p={3}
        
      >
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
                  Login
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
              <Box display="flex" justifyContent="center" mb={2}>
                <Button type="submit" color="secondary" variant="contained">
                  Login
                </Button>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="body2">
                  No account? 
                  <Link
                  to={"/register"}
                  >Sign Up here</Link>
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
}    
      </>
);

}