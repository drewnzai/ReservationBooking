import { useLocation, useNavigate } from "react-router-dom";
import { Box, Grid, Button, Typography } from '@mui/material';

export default function Available(){
    const location = useLocation();
    const navigate = useNavigate();
    const {rooms} = location.state; 
    return (
        <Box sx={{ flexGrow: 1, padding: '20px', textAlign: 'center' }}>
      {rooms.length === 0 ? (
        <Box>
          <Typography variant="h1" component="h2" gutterBottom>
            No rooms are available
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Go back to Home
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {rooms.map((room, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RoomCard
                roomType={room.roomType}
                imageUrl={room.imageUrl}
                description={`Available for ${room.days} days. Total cost: $${room.total}`}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

}