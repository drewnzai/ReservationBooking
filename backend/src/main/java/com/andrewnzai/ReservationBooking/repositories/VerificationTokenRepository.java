package com.andrewnzai.ReservationBooking.repositories;

import com.andrewnzai.ReservationBooking.models.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

    VerificationToken findByToken(String token);

}
