import {Formik} from "formik";
import * as yup from "yup";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Box, Button, Card, CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {ReservationRequest} from "../models/ReservationRequest";
import ReservationService from "../services/ReservationService.service";
import {Link, useNavigate} from "react-router-dom";
import {Reservation} from "../models/Reservation.ts";
import { useEffect, useState } from "react";

export default function Home(){
    const reservationService = new ReservationService();
    const navigate = useNavigate();
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const initialValues: ReservationRequest = {
        guestsNo: 1,
        fromDate: "",
        toDate: ""
    };

    const checkoutSchema = yup.object().shape({
       guestsNo: yup.number().required("Number of guests is required"),
       fromDate: yup.string().required("The check in date is required"),
       toDate: yup.string().required("The check out date is required")
    });

    const handleFormSubmit = (values: ReservationRequest) => {
        reservationService.searchForAvailableRooms(values)
            .then(
                (response: Reservation[]) => {
                    navigate("/available", {state: {rooms: response}})
            }
            );
    };

    useEffect(() => {
      // Fetch user's reservations on component mount
      reservationService.getReservations()
          .then((response: Reservation[]) => {
              setReservations(response);
          });
  }, []);

    return(
        <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Box
        width={{ xs: '90%', sm: '400px' }}
        p={3}
      >
        {reservations.length > 0 && (
                    <Link
                    to={"/reservations"}
                    state={reservations}
                    style={{
                      textDecoration: "none"
                    }}
                    >
                    
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6">
                                You have {reservations.length} reservation(s)
                            </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                )}

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
              <Typography variant="h4" align="center" gutterBottom>
                Search for Rooms
              </Typography>
              <Box mb={3}>
                <FormControl fullWidth>
                  <InputLabel id="guests-number-label">Number of Guests</InputLabel>
                  <Select
                    labelId="guests-number-label"
                    value={values.guestsNo}
                    label="Number of Guests"
                    name="guestsNo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.guestsNo && !!errors.guestsNo}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                  <FormHelperText error={!!touched.guestsNo && !!errors.guestsNo}>
                    {touched.guestsNo && errors.guestsNo ? errors.guestsNo : 'Required'}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box mb={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="From"
                      disablePast
                      onChange={(newValue) => {
                        if (newValue) {
                          const date = newValue.toDate();
                          const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                            .toString()
                            .padStart(2, '0')}/${date.getFullYear()}`;
                          values.fromDate = formattedDate;
                        }
                      }}
                      slots={{
                        textField: (params) => 
                            <TextField
                              {...params}
                              fullWidth
                              error={!!touched.fromDate && !!errors.fromDate}
                              helperText={touched.fromDate && errors.fromDate}
                            />
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box mb={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="To"
                      disablePast
                      onChange={(newValue) => {
                        if (newValue) {
                          const date = newValue.toDate();
                          const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                            .toString()
                            .padStart(2, '0')}/${date.getFullYear()}`;
                          values.toDate = formattedDate;
                        }
                      }}
                      slots={{
                        textField: (params) => 
                            <TextField
                              {...params}
                              fullWidth
                              error={!!touched.toDate && !!errors.toDate}
                              helperText={touched.toDate && errors.toDate}
                            />
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box display="flex" justifyContent="center" mb={2}>
                <Button type="submit" color="secondary" variant="contained">
                  Search
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
    );
}