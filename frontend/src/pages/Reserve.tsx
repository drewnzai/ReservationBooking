import { useLocation, useNavigate } from "react-router-dom";
import ReservationService from "../services/ReservationService.service";

export default function Reserve(){
    const location = useLocation();
    const navigate = useNavigate();
    const {room} = location.state;
    const reservationService = new ReservationService();

    return(
        <div>
            Confirm reservation
        </div>
    );

}