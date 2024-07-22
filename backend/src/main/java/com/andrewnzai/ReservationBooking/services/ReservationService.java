package com.andrewnzai.ReservationBooking.services;

import org.springframework.stereotype.Service;

import com.andrewnzai.ReservationBooking.repositories.ReservationRepository;
import com.andrewnzai.ReservationBooking.repositories.RoomRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;

    public List<ReservationDto> searchForAvailable(ReservationRequest reservationRequest){
        return null;
    }
}
