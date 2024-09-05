package com.andrewnzai.ReservationBooking.api;

import com.andrewnzai.ReservationBooking.dtos.APIResponse;
import com.andrewnzai.ReservationBooking.dtos.ReservationDto;
import com.andrewnzai.ReservationBooking.dtos.ReservationRequest;
import com.andrewnzai.ReservationBooking.services.ReservationService;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/all")
    public List<ReservationDto> getReservations(){
        return reservationService.getAllReservations();
    }

    @GetMapping("/user")
    public List<ReservationDto> getReservationsByUser(){
        return reservationService.getAllReservationsByUser();
    }

    @PostMapping("/modify-request")
    public Object reservationModificationRequest(@RequestBody ReservationDto reservationDto){
        try{
            return reservationService.modifyReservationRequest(reservationDto);
        }
        catch(Exception e){
            return APIResponse.builder().data("Cannot modify the reservation, try again or make a  new reservation").build();
        }
    }

    @PostMapping("/complete-modification")
    public Object completeModification(@RequestBody ReservationDto reservationDto){
        try{
            reservationService.completeReservationModification(reservationDto);

            return true;
        }catch(Exception e){
            return APIResponse.builder().data("Could not modify the reservation").build();
        }
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
