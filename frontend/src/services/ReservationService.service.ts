import {ReservationRequest} from "../models/ReservationRequest";
import ApiInterceptor from "../auth/ApiInterceptor";
import { Reservation } from "../models/Reservation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default class ReservationService{
    private navigate = useNavigate();

    searchForAvailableRooms(reservationRequest: ReservationRequest){
        return ApiInterceptor.post("reservation/search", reservationRequest)
            .then(
                (response) => {
                    if(response.data){
                        return response.data;
                    }
                }
            )
    }

    makeReservation(reservation: Reservation){
        return ApiInterceptor.post("reservation/reserve", reservation)
            .then(
                (response) => {
                    if(response.data.data){
                        toast.error("Could not complete the reservation, try again");
                        this.navigate("/");
                    }
                    else{
                        toast.success("Reservation is successful");
                        this.navigate("/");
                    }
                }
            )
    }
}