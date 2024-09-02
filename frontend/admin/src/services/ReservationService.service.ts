import ApiInterceptor from "../auth/ApiInterceptor";

export default class ReservationService{
    getAllReservations(){
        return ApiInterceptor.get("reservation/all")
            .then((response) => {
                if(response.data){
                    return response.data;
                }
            })
    }
}