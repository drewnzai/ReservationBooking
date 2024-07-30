package com.andrewnzai.ReservationBooking.services;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.andrewnzai.ReservationBooking.dtos.AvailableRoom;
import com.andrewnzai.ReservationBooking.dtos.ReservationRequest;
import com.andrewnzai.ReservationBooking.enums.RoomType;
import com.andrewnzai.ReservationBooking.models.Reservation;
import com.andrewnzai.ReservationBooking.models.Room;
import com.andrewnzai.ReservationBooking.models.User;
import com.andrewnzai.ReservationBooking.repositories.ReservationRepository;
import com.andrewnzai.ReservationBooking.repositories.RoomRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final AuthService authService;

    public List<AvailableRoom> searchForAvailable(ReservationRequest reservationRequest) {
        List<Room> rooms = roomRepository.findAll();
        List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(
                reservationRequest.getFromDate(), reservationRequest.getToDate());

        Map<Long, Integer> reservedRoomCounts = new HashMap<>();

        for (Reservation reservation : overlappingReservations) {
            reservedRoomCounts.put(reservation.getRoom().getId(), 
                reservedRoomCounts.getOrDefault(reservation.getRoom().getId(), 0) + 1);
        }

        List<AvailableRoom> availableRooms = new ArrayList<>();
        Long days = ChronoUnit.DAYS.between(reservationRequest.getFromDate(), reservationRequest.getToDate());
        int guestsNo = reservationRequest.getGuestsNo();

        for (Room room : rooms) {
            int reservedCount = reservedRoomCounts.getOrDefault(room.getId(), 0);
            int availableCount = room.getAvailable() - reservedCount;
            int roomCapacity = room.getAccommodates();
            int requiredRooms = (int) Math.ceil((double) guestsNo / roomCapacity);

            if (availableCount >= requiredRooms) {
                long totalCost = room.getPrice() * requiredRooms * days;
                
                AvailableRoom availableRoom = new AvailableRoom();
                availableRoom.setDays(days);
                availableRoom.setRoomType(room.getRoomType().name());
                availableRoom.setTotal(totalCost);
                availableRoom.setOccupants(guestsNo);
                availableRoom.setCheckIn(reservationRequest.getFromDate());
                availableRoom.setCheckOut(reservationRequest.getToDate());

                availableRooms.add(availableRoom);
            }
        }

        return availableRooms;
    }

    public boolean makeReservation(AvailableRoom availableRoom){
        User user = authService.getCurrentUser();

        RoomType roomType = RoomType.valueOf(availableRoom.getRoomType());
        Room room = roomRepository.findByRoomType(roomType);

        Reservation reservation = new Reservation();
        reservation.setCheckIn(availableRoom.getCheckIn());
        reservation.setCheckOut(availableRoom.getCheckOut());
        reservation.setOccupants(availableRoom.getOccupants());
        reservation.setReserver(user);
        reservation.setRoom(room);

        reservationRepository.save(reservation);

        return true;

    }

   
}
