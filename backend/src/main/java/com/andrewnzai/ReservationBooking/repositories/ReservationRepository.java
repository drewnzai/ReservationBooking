package com.andrewnzai.ReservationBooking.repositories;

import com.andrewnzai.ReservationBooking.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r WHERE r.checkIn < :toDate AND r.checkOut > :fromDate")
    List<Reservation> findOverlappingReservations(@Param("fromDate") LocalDate fromDate, @Param("toDate") LocalDate toDate);
}
