package com.andrewnzai.ReservationBooking.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andrewnzai.ReservationBooking.models.Room;
import com.andrewnzai.ReservationBooking.services.RoomService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/rooms")
@AllArgsConstructor
public class RoomController {
    
    private final RoomService roomService;

    @PostMapping
    public ResponseEntity<List<Room>> createRooms(@RequestBody List<Room> rooms) {
        List<Room> createdRooms = roomService.saveRooms(rooms);
        return ResponseEntity.ok(createdRooms);
    }
}
