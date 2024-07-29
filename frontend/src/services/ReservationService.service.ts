import { ReservationRequest } from "../models/ReservationRequest";
import ApiInterceptor from "../auth/ApiInterceptor";

const base_url = "http://localhost:8080/api/reservation/";

export default class ReservationService{
    searchForAvailableRooms(reservationRequest: ReservationRequest){
        return ApiInterceptor.post(base_url + "search", reservationRequest)
            .then(
                (response) => {
                    if(response.data){
                        return response.data;
                    }
                }
            )
    }
}