package com.andrewnzai.ReservationBooking.repositories;

import com.andrewnzai.ReservationBooking.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{

    boolean existsByName(String role);

    Role findByName(String role);

}
