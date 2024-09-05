import {useLocation, useNavigate} from "react-router-dom";
import ReservationService from "../services/ReservationService.service";
import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {Reservation} from "../models/Reservation.ts";

export default function Complete(){
    const location = useLocation();
    const navigate = useNavigate();
    const reservation:Reservation = location.state.response;
    const reservationService = new ReservationService();

    const handleConfirm = () => {
        reservationService.completeModification(reservation);
      };

    return(
        <Box sx={{ flexGrow: 1, padding: '20px', textAlign: 'center' }}>
      <Paper elevation={3} sx={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Verify Your Reservation
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Room Type"
              value={reservation.roomType}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Number of Days"
              value={reservation.days}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Total Cost"
              value={`$${reservation.total}`}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Total Occupants"
              value={`${reservation.occupants}`}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Box mt={4}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleConfirm}
          >
            Make Reservation
          </Button>
        </Box>

        <Box mt={4}>
        <Button variant="contained" sx={{
          backgroundColor: "red"
        }} onClick={() => navigate('/')}>
            Go back to Home
          </Button>
        </Box>

      </Paper>
    </Box>
    );

}