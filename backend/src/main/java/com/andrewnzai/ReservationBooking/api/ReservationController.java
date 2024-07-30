package com.andrewnzai.ReservationBooking.api;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andrewnzai.ReservationBooking.dtos.ReservationRequest;
import com.andrewnzai.ReservationBooking.dtos.APIResponse;
import com.andrewnzai.ReservationBooking.dtos.ReservationDto;
import com.andrewnzai.ReservationBooking.services.ReservationService;

import lombok.AllArgsConstructor;


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
            return APIResponse.builder().data("Couldn't make the reservation. try again").build();
        }
    }
}
