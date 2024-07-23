package com.andrewnzai.ReservationBooking.services;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.andrewnzai.ReservationBooking.dtos.AvailableRoom;
import com.andrewnzai.ReservationBooking.dtos.ReservationRequest;
import com.andrewnzai.ReservationBooking.models.Room;
import com.andrewnzai.ReservationBooking.repositories.ReservationRepository;
import com.andrewnzai.ReservationBooking.repositories.RoomRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;

    public List<AvailableRoom> searchForAvailable(ReservationRequest reservationRequest) {
        List<Room> rooms = roomRepository.findAll();
        List<AvailableRoom> availableRooms = new ArrayList<>();

        Long days = ChronoUnit.DAYS.between(reservationRequest.getFromDate(), reservationRequest.getToDate());
        
        for(Room room: rooms){
            if(room.getAvailable() * room.getAccomodates() >= reservationRequest.getGuestsNo()){
                
            }
        }

        return availableRooms;
    }

   
}
