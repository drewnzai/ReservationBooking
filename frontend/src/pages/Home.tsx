import {Formik} from "formik";
import * as yup from "yup";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import { ReservationRequest } from "../models/ReservationRequest";
import ReservationService from "../services/ReservationService.service";

export default function Home(){
    const reservationService = new ReservationService();

    const initialValues: ReservationRequest = {
        guestsNo: 1,
        fromDate: "",
        toDate: ""
    };

    const checkoutSchema = yup.object().shape({
       guestsNo: yup.number().required("required"),
       fromDate: yup.string().required("The date is required"),
       toDate: yup.string().required("The date is required")
    });

    const handleSubmit = (values: ReservationRequest) => {
        reservationService.searchForAvailableRooms(values)
            .then(
                (response) => {
                console.log(response)
            }
            );
    };

    return(
        <Box
        sx={{
            alignItems: "center",
            justifyContent: "center",
            padding: "3px"
        }}
        >
            <Box
            mt={"200px"}
            ml={"600px"}
            display="block"
            width="300px"
            gap="30px"
            p={"10px"}
            sx={{
                alignItems: "center",
                justifyContent: "center"

            }}            
            >
                <Formik
                onSubmit={handleSubmit}
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
                <Box
                display={"block"}
                >
                    <FormControl fullWidth>
                    <InputLabel id="guests-number-label">Number of Guests</InputLabel>

                    <Select
                    labelId="guests-number-label"
                    value={values.guestsNo}
                    label="GuestsNo"
                    name="guestsNo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.guestsNo && !!errors.guestsNo}
                    defaultValue={1}
                    >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                    </FormControl>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                    label="From"
                    disablePast 
                    onChange={(newValue) => {
                        // will never be null
                        //@ts-ignore 
                        const date = newValue.toDate();
                        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                            .toString()
                            .padStart(2, '0')}/${date.getFullYear()}`;

                        values.fromDate = formattedDate;

                        }}/>
                        
                </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                    label="To"
                    disablePast 
                    onChange={(newValue) => {
                        // will never be null
                        //@ts-ignore 
                        const date = newValue.toDate();
                        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                            .toString()
                            .padStart(2, '0')}/${date.getFullYear()}`;

                        values.toDate = formattedDate;

                        }}/>
                        
                </DemoContainer>
            </LocalizationProvider>
            <br/>
            <br/>
            <Box>

            <Button type="submit" color="secondary" variant="contained">
                Search
              </Button>

            </Box>
                </Box>
            </form>
        )}
                </Formik>

            </Box>
        </Box>
    );
}