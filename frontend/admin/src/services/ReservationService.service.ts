import { useNavigate } from "react-router-dom";
import ApiInterceptor from "../auth/ApiInterceptor";
import { Reservation } from "../models/Reservation";
import { toast } from "react-toastify";

export default class ReservationService{
    private navigate = useNavigate();
    
    getAllReservations(){
        return ApiInterceptor.get("reservation/all")
            .then((response) => {
                if(response.data){
                    return response.data;
                }
            })
    }

    deleteReservation(reservation: Reservation){
        return ApiInterceptor.post("reservation/delete", reservation)
            .then(
                (response) => {
                    if(response.data.data){
                        toast.error("Could not delete the reservation");
                        this.navigate("/");
                    }
                    else{
                        toast.success("Successfully deleted the reservation");
                        this.navigate("/");
                    }
                }
            )
    }
}