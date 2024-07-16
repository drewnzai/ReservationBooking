package com.andrewnzai.ReservationBooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.andrewnzai.ReservationBooking.models.User;

public interface UserRepository extends JpaRepository<User, Long>{

    User findByEmail(String email);

}
