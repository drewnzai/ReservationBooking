package com.andrewnzai.ReservationBooking.repositories;

import com.andrewnzai.ReservationBooking.enums.RoomType;
import com.andrewnzai.ReservationBooking.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT r FROM Room r WHERE r.roomType = :roomType")
    Room findByRoomType(@Param("roomType") RoomType roomType);
}
