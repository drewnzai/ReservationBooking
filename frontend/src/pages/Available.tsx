import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Grid, Button, Typography } from '@mui/material';
import RoomCard from "../components/RoomCard";

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
            { /*@ts-ignore */}
          {rooms.map((room, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link
              to={"/reserve"}
              key={room.roomType}
              state={room}
              >              
              <RoomCard
                roomType={room.roomType}
                imageUrl={`${room.roomType.toLowerCase().replace(/ /g, '-')}.jpeg`}
                description={`Available for ${room.days} days.`}
                cost = {`Total cost: $${room.total}`}
              />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

}