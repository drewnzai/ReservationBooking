import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Reservation } from "../models/Reservation";

export default function ReservationDetail(){
    const location = useLocation();
    const navigate = useNavigate();
    const reservation: Reservation = location.state.reservation;
  
    const [open, setOpen] = useState(false);
    const [editedReservation, setEditedReservation] = useState(reservation);
  
    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedReservation({
        ...editedReservation,
        [e.target.name]: e.target.value,
      });
    };
  
    // Handle save changes
    const handleSave = () => {
      axios.put(`/api/reservations/${reservation.id}`, editedReservation)
        .then(() => {
          alert("Reservation updated successfully!");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error updating reservation:", error);
        });
    };
  
    // Handle delete confirmation dialog
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDelete = () => {
      axios.delete(`/api/reservations/${reservation.id}`)
        .then(() => {
          alert("Reservation deleted successfully!");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting reservation:", error);
        });
    };
  
    return (
      <Box padding={2}>
        <Typography variant="h4" gutterBottom>
          Reservation Details
        </Typography>
        <TextField
          label="Reserver"
          name="reserver"
          value={editedReservation.reserver}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Room Type"
          name="roomType"
          value={editedReservation.roomType}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Check-In Date"
          name="checkIn"
          value={editedReservation.checkIn}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Check-Out Date"
          name="checkOut"
          value={editedReservation.checkOut}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Occupants"
          name="occupants"
          type="number"
          value={editedReservation.occupants}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Total Cost"
          name="total"
          type="number"
          value={editedReservation.total}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
  
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
        </Box>
  
        <Dialog
          open={open}
          onClose={handleClose}
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
            <Button onClick={handleClose} color="primary">
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