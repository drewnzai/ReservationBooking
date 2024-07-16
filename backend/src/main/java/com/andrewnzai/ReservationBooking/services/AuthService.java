package com.andrewnzai.ReservationBooking.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.andrewnzai.ReservationBooking.repositories.RoleRepository;
import com.andrewnzai.ReservationBooking.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    
}
