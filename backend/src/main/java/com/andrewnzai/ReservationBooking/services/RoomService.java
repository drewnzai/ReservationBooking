package com.andrewnzai.ReservationBooking.services;

import com.andrewnzai.ReservationBooking.models.Room;
import com.andrewnzai.ReservationBooking.repositories.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public List<Room> saveRooms(List<Room> rooms) {
        return roomRepository.saveAll(rooms);
    }
}
