package com.andrewnzai.ReservationBooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.andrewnzai.ReservationBooking.models.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

}
