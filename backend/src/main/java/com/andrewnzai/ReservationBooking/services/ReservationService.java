package com.andrewnzai.ReservationBooking.services;

import com.andrewnzai.ReservationBooking.dtos.ReservationDto;
import com.andrewnzai.ReservationBooking.dtos.ReservationRequest;
import com.andrewnzai.ReservationBooking.enums.RoomType;
import com.andrewnzai.ReservationBooking.models.Reservation;
import com.andrewnzai.ReservationBooking.models.Room;
import com.andrewnzai.ReservationBooking.models.User;
import com.andrewnzai.ReservationBooking.repositories.ReservationRepository;
import com.andrewnzai.ReservationBooking.repositories.RoomRepository;
import com.andrewnzai.ReservationBooking.repositories.UserRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final AuthService authService;

    public List<ReservationDto> searchForAvailable(ReservationRequest reservationRequest) {
        List<Room> rooms = roomRepository.findAll();
        List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(
                reservationRequest.getFromDate(), reservationRequest.getToDate());

        Map<Long, Integer> reservedRoomCounts = new HashMap<>();

        for (Reservation reservation : overlappingReservations) {
            reservedRoomCounts.put(reservation.getRoom().getId(), 
                reservedRoomCounts.getOrDefault(reservation.getRoom().getId(), 0) + 1);
        }

        List<ReservationDto> reservationDtos = new ArrayList<>();
        Long days = ChronoUnit.DAYS.between(reservationRequest.getFromDate(), reservationRequest.getToDate());
        int guestsNo = reservationRequest.getGuestsNo();

        for (Room room : rooms) {
            int reservedCount = reservedRoomCounts.getOrDefault(room.getId(), 0);
            int availableCount = room.getAvailable() - reservedCount;
            int roomCapacity = room.getAccommodates();
            int requiredRooms = (int) Math.ceil((double) guestsNo / roomCapacity);

            if (availableCount >= requiredRooms) {
                long totalCost = room.getPrice() * requiredRooms * days;
                
                ReservationDto reservationDto = new ReservationDto();
                reservationDto.setDays(days);
                reservationDto.setRoomType(room.getRoomType().name());
                reservationDto.setTotal(totalCost);
                reservationDto.setOccupants(guestsNo);
                reservationDto.setCheckIn(reservationRequest.getFromDate());
                reservationDto.setCheckOut(reservationRequest.getToDate());

                reservationDtos.add(reservationDto);
            }
        }

        return reservationDtos;
    }

    public List<ReservationDto> getAllReservations(){
        List<Reservation> reservations = reservationRepository.findAll();

        return mapToDtos(reservations);
    }

    private List<ReservationDto> mapToDtos(List<Reservation> reservations) {
        List<ReservationDto> reservationDtos = new ArrayList<>();
        for(Reservation reservation: reservations){
            ReservationDto reservationDto = new ReservationDto();

            reservationDto.setId(reservation.getId());
            reservationDto.setCheckIn(reservation.getCheckIn());
            reservationDto.setCheckOut(reservation.getCheckOut());
            reservationDto.setDays(ChronoUnit.DAYS.between(reservation.getCheckIn(), reservation.getCheckOut()));
            reservationDto.setOccupants(reservation.getOccupants());
            reservationDto.setRoomType(reservation.getRoom().getRoomType().name());
            reservationDto.setTotal(reservation.getTotal());
            reservationDto.setReservationDate(reservation.getReservationDate());
            reservationDto.setReserver(reservation.getReserver().getEmail());

            reservationDtos.add(reservationDto);
        }

        return reservationDtos;
    }

    public List<ReservationDto> getAllReservationsByUser(){
        User user = authService.getCurrentUser();

        List<Reservation> reservations = reservationRepository.findAllByReserver(user);

        return mapToDtos(reservations);
    }

    public boolean makeReservation(ReservationDto reservationDto) throws Exception{
        if(reservationDto.getCheckIn().isBefore(reservationDto.getCheckOut())){

            User user = authService.getCurrentUser();
    
            RoomType roomType = RoomType.valueOf(reservationDto.getRoomType());
            Room room = roomRepository.findByRoomType(roomType);
    
            Reservation reservation = new Reservation();
            reservation.setCheckIn(reservationDto.getCheckIn());
            reservation.setCheckOut(reservationDto.getCheckOut());
            reservation.setOccupants(reservationDto.getOccupants());
            reservation.setReserver(user);
            reservation.setRoom(room);
            reservation.setTotal(reservationDto.getTotal());
            reservation.setReservationDate(LocalDate.now());
    
            reservationRepository.save(reservation);
    
            return true;
        }
        else{
            throw new Exception("Invalid dates");
        }

    }

    public ReservationDto modifyReservationRequest(ReservationDto reservationDto){
        Reservation reservation = reservationRepository.findById(reservationDto.getId()).get();

        long days = ChronoUnit.DAYS.between(reservationDto.getCheckIn(), reservationDto.getCheckOut());

        reservation.setCheckIn(reservationDto.getCheckIn());
        reservation.setCheckOut(reservationDto.getCheckOut());
        reservation.setOccupants(reservationDto.getOccupants());
        
        reservation.setTotal(reservationDto.getTotal());
        reservation.setReservationDate(LocalDate.now());
    
            reservationRepository.save(reservation);
    
    }

    public void deleteReservation(Long id) throws Exception{
        Reservation reservation = reservationRepository.findById(id).orElseThrow();
        User user = authService.getCurrentUser();

        if(reservation.getReserver().equals(user)){
            reservationRepository.delete(reservation);
        }else{
            throw new Exception("Could not delete reservation");
        }
    }

   
}
