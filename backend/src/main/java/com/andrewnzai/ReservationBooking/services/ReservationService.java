package com.andrewnzai.ReservationBooking.services;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

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

    public List<AvailableRoom> searchForAvailable(ReservationRequest reservationRequest){
        List<Room> rooms = roomRepository.findAll();
        List<AvailableRoom> availableRooms = new ArrayList<>();

        for(Room room: rooms){
            
            if(room.getAvailable() >= reservationRequest.getGuestsNo()){
                Long days = ChronoUnit.DAYS.between(reservationRequest.getFromDate(), reservationRequest.getToDate());

                AvailableRoom availableRoom = new AvailableRoom();
                availableRoom.setRoomType(room.getRoomType().name());
                availableRoom.setDays(days);
                availableRoom.setTotal(room.getPrice()* reservationRequest.getGuestsNo()* days);
                
                availableRooms.add(availableRoom);
            }
        }
        return availableRooms;
    }
}
