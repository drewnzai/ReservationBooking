import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, InputLabel, MenuItem, Select } from "@mui/material";
import { Dayjs } from "dayjs";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Reservation } from "../models/Reservation";
import ReservationService from "../services/ReservationService.service";


export default function ReservationDetail(){
    const location = useLocation();
    const navigate = useNavigate();
    const reservation: Reservation = location.state.reservation;
    const reservationService = new ReservationService();
    const [minDate, setMinDate] = useState<Dayjs>();
  
    const [open, setOpen] = useState(false);
    const [editedReservation, setEditedReservation] = useState(reservation);
  
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setEditedReservation({
        ...editedReservation,
        [name]: value,
      });
    };
  
    const handleSave = () => {
      reservationService.reservationModificationRequest(editedReservation)
        .then(
          (response: Reservation) => {
            navigate(`/reservation/complete/${editedReservation.id}`, {state: {response}})
          }
        )
    };
  
     const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleCloseDialog = () => {
        setOpen(false);
      };

    const handleClose = () => {
    navigate("/");
    };
    
  
    const handleDelete = () => {
      reservationService.deleteReservation(reservation);
    };


    return (
      <Box padding={2}>
        <Typography variant="h4" gutterBottom>
          Reservation Details
        </Typography>
        <TextField
          label="Room Type"
          name="roomType"
          value={editedReservation.roomType}
          onChange={handleChange}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          margin="normal"
        />
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
                         setMinDate(newValue);
                         editedReservation.checkIn = formattedDate;
                     }
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
                   minDate={minDate}
                   onChange={(newValue) => {
                     if (newValue) {
                       const date = newValue.toDate();
                       const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                         .toString()
                         .padStart(2, '0')}/${date.getFullYear()}`;
                       editedReservation.checkOut = formattedDate;
                     }
                   }}
                 />
               </DemoContainer>
             </LocalizationProvider>
           </Box>
           
               <InputLabel id="guests-number-label">Number of Guests</InputLabel>
               <Select
                 labelId="guests-number-label"
                 value={editedReservation.occupants}
                 label="Number of Occupants"
                 name="occupants"
                 onChange={handleChange}
               >
                 <MenuItem value={1}>1</MenuItem>
                 <MenuItem value={2}>2</MenuItem>
                 <MenuItem value={3}>3</MenuItem>
                 <MenuItem value={4}>4</MenuItem>
                 <MenuItem value={5}>5</MenuItem>
                 <MenuItem value={6}>6</MenuItem>
               </Select>
        
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
            style={{ marginLeft: "10px" }}
          >
            Delete Reservation
          </Button>
          <Button
          variant="contained"
          color="secondary"
          onClick={handleClose}
          style={{ marginLeft: "10px" }}
        >
          Close
        </Button>
        </Box>
  
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this reservation? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };