import { useLocation, useNavigate } from "react-router-dom";
import { Reservation } from "../models/Reservation";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useState } from "react";
import ReservationService from "../services/ReservationService.service";

export default function ReservationPage() {
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
        .catch((error) => {
          console.error("Error deleting reservation:", error);
        });
    }
  };

  return (
    <Box p={3}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "red",
          color: "#fff",
          marginBottom: "20px",
        }}
        onClick={() => navigate("/")}
      >
        Go back to Home
      </Button>

      <Typography variant="h4" gutterBottom>
        Your Reservations
      </Typography>

      {reservations.length === 0 ? (
        <Typography variant="body1">No reservations found.</Typography>
      ) : (
        reservations.map((reservation, index) => (
          <Card key={index} sx={{ marginBottom: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Reservation {index + 1}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Check-In: {reservation.checkIn}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Check-Out: {reservation.checkOut}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Days: {reservation.days}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Guests: {reservation.occupants}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Price: ${reservation.total}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Room Type: {reservation.roomType}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Date Made: {reservation.reservationDate}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteClick(reservation)}
                sx={{ marginLeft: "auto" }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))
      )}

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Reservation</DialogTitle>
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
 