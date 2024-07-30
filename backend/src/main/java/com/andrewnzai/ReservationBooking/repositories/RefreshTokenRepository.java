package com.andrewnzai.ReservationBooking.repositories;

import com.andrewnzai.ReservationBooking.models.RefreshToken;
import com.andrewnzai.ReservationBooking.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>{

    RefreshToken findByTokenAndUser(String refreshToken, User user);

    void deleteByToken(String refreshToken);

}
