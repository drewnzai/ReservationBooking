package com.andrewnzai.ReservationBooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrewnzai.ReservationBooking.models.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
