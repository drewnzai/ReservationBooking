import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface RoomCardProps {
  roomType: string;
  imageUrl: string;
  description: string;
  cost: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ roomType, imageUrl, description, cost }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={roomType}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {roomType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h2" color="text.secondary">
          {cost}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
