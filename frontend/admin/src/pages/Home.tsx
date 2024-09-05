import {useEffect, useState} from "react";
import {Reservation} from "../models/Reservation";
import ReservationService from "../services/ReservationService.service";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();

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
            })
    }, []); 

    const handleSelectEvent = (reservation: Reservation) => {
        // Navigate to the reservation detail/edit page
        navigate(`/reservation/${reservation.id}`, { state: { reservation } });
      };

    return(
        <Box 
        sx={{
            padding: "20px",
            backgroundColor: "#f7f7f7"
        }}
        >
            <Calendar
        localizer={localizer}
        events={reservations}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 650,
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
    );
}