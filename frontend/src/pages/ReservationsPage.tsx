import { useLocation, useNavigate } from "react-router-dom";
import { Reservation } from "../models/Reservation";
import { Box, Button, Typography } from "@mui/material";

export default function ReservationPage(){
    const navigate = useNavigate();
    const location = useLocation();
    const {reservations} = location.state as { reservations: Reservation[] };

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
                </Box>
            ))}
        </Box>
    );
}