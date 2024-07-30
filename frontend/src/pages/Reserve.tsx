import { useLocation, useNavigate } from "react-router-dom";
import ReservationService from "../services/ReservationService.service";
import { AvailableRooms } from "../models/AvailableRooms";

export default function Reserve(){
    const location = useLocation();
    const navigate = useNavigate();
    const room:AvailableRooms = location.state;
    const reservationService = new ReservationService();

    return(
        <div>
            {room.roomType}
            <br/>
            {room.days}
        </div>
    );

}