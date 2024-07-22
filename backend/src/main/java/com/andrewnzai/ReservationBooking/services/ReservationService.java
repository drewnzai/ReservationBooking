package com.andrewnzai.ReservationBooking.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

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

    public Object searchForAvailable(ReservationRequest reservationRequest){
        List<Room> rooms = roomRepository.findAll();

        for(Room room: rooms){
            if(room.getAvailable() >= reservationRequest.getGuestsNo()){

            }
        }
        return null;
    }
}
