import { useLocation, useNavigate } from "react-router-dom";
import { Reservation } from "../models/Reservation";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import ReservationService from "../services/ReservationService.service";

export default function ReservationPage(){
    const navigate = useNavigate();
    const location = useLocation();
    const reservations: Reservation[] = location.state;
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
    const [open, setOpen] = useState(false);
    const reservationService = new ReservationService();

    const handleDeleteClick = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    setSelectedReservation(null);
    };

    const handleDeleteConfirm = () => {
        if (selectedReservation) {
          reservationService.deleteReservation(selectedReservation)
            .then(() => {
              handleClose();
            })
            .catch(error => {
              console.error('Error deleting reservation:', error);
            });
        }
    };

    return(
        <Box p={3}>
            <Button variant="contained" sx={{
                backgroundColor: "red"
                }} onClick={() => navigate('/')}>
                    Go back to Home
          </Button>
            <Typography variant="h4" gutterBottom>
                Your Reservations
            </Typography>
            {reservations.map((reservation, index) => (
                <Box key={index} mb={2} p={2} border={1} borderRadius={2}>
                    <Typography variant="body1">
                        Reservation {index + 1}:
                    </Typography>
                    <Typography variant="body2">
                        From: {reservation.checkOut}
                    </Typography>
                    <Typography variant="body2">
                        To: {reservation.checkIn}
                    </Typography>
                    <Typography variant="body2">
                        Days: {reservation.days}
                    </Typography>
                    <Typography variant="body2">
                        Guests: {reservation.occupants}
                    </Typography>
                    <Typography variant="body2">
                        Total price: {reservation.total}
                    </Typography>
                    <Typography variant="body2">
                        Room: {reservation.roomType}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteClick(reservation)}> 
                            Delete
                    </Button>
                </Box>
            ))}

    <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
            Delete Reservation
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this reservation? This action cannot be undone.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="secondary">
                Delete
            </Button>
            </DialogActions>
    </Dialog>
        </Box>
    );
}