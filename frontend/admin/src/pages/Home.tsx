import {useEffect, useState} from "react";
import {Reservation} from "../models/Reservation";
import ReservationService from "../services/ReservationService.service";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Loading from "../components/Loading";
import AuthService from "../services/AuthService.service";

const localizer = momentLocalizer(moment);

interface CalendarEvent extends Reservation {
    start: Date;
    end: Date;
  }


const EventComponent = ({ event }: {event: any}) => {
    return (
        <span style={{ color: "black" }}>
        <strong>{event.title}</strong>
        </span>
);
};
  
export default function Home(){
    const [reservations, setReservations] = useState<CalendarEvent[]>([]);
    const reservationService = new ReservationService();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const authService = new AuthService();

    useEffect(() => {
        reservationService.getAllReservations()
            .then((response: CalendarEvent[]) => {
                
                const data = response.map(reservation => ({
                    ...reservation,
                    start: new Date(reservation.checkIn),
                    end: new Date(reservation.checkOut),
                    title: `${reservation.reserver} - ${reservation.roomType}`
                }));

                setReservations(data);
                setLoading(false);
            })
    }, []); 

    const handleSelectEvent = (reservation: Reservation) => {
        // Navigate to the reservation detail/edit page
        navigate(`/reservation/${reservation.id}`, { state: { reservation } });
      };

    return(
        <>
        {loading? (
            <Loading/>
        ):
        (
        <Box 
        sx={{
            padding: "20px",
            backgroundColor: "#f7f7f7"
        }}
        >
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            width: "auto",
            justifyContent: "flex-end", // Push the button to the bottom
            alignItems: "center", // Center the button horizontally
            paddingBottom: "5px" // Optional padding to avoid sticking to the bottom edge
          }}
        >
                <Button 
                    variant="contained"
                    sx={{
                    backgroundColor: "red"
                    }}
                    onClick={() => {
                    authService.logout();
                    }}>
                Log out
            </Button>
        </Box>
        <Calendar
        localizer={localizer}
        events={reservations}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 620,
            color: "black"
         }}
        onSelectEvent={handleSelectEvent}
        views={['month', 'week', 'day']}
        components={{
            event: EventComponent  // Use custom event component
          }}
        defaultView="month"
      />
        </Box>
        )}
        </>
    );
}