import { useLocation, useNavigate } from "react-router-dom";
import ReservationService from "../services/ReservationService.service";
import { Box, Button, Typography, TextField, Grid, Paper } from '@mui/material';
import { AvailableRooms } from "../models/AvailableRooms";

export default function Reserve(){
    const location = useLocation();
    const navigate = useNavigate();
    const room:AvailableRooms = location.state;
    const reservationService = new ReservationService();

    const handleConfirm = () => {
        console.log(room);
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
              value={room.roomType}
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
              value={room.days}
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
              value={`$${room.total}`}
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
              value={`${room.occupants}`}
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
            Confirm Reservation
          </Button>
        </Box>
      </Paper>
    </Box>
    );

}