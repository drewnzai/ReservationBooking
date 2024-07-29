import { ReservationRequest } from "../models/ReservationRequest";
import ApiInterceptor from "../auth/ApiInterceptor";


export default class ReservationService{
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
}