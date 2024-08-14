package com.andrewnzai.ReservationBooking.api;

import com.andrewnzai.ReservationBooking.dtos.APIResponse;
import com.andrewnzai.ReservationBooking.dtos.ReservationDto;
import com.andrewnzai.ReservationBooking.dtos.ReservationRequest;
import com.andrewnzai.ReservationBooking.services.ReservationService;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/reservation")
@AllArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping("/search")
    public List<ReservationDto> searchForAvailableRooms(@RequestBody ReservationRequest reservationRequest){
        return reservationService.searchForAvailable(reservationRequest);
    }

    @PostMapping("/reserve")
    public Object makeReservation(@RequestBody ReservationDto reservationDto){
        try{
            return reservationService.makeReservation(reservationDto);
        }
        catch(Exception e){
            return APIResponse.builder().data("Couldn't make the reservation due to: " + e.getMessage() + " . try again").build();
        }
    }

    @GetMapping()
    public List<ReservationDto> getReservations(){
        return reservationService.getAllReservations();
    }

    @PostMapping("/delete")
    public Object deleteReservation(@RequestBody ReservationDto reservationDto){
        try{
            reservationService.deleteReservation(reservationDto.getId());
            return true;
        }
        catch(Exception e){
            return APIResponse.builder().data("Couldn't make the reservation. try again").build();
        }
    }
}
