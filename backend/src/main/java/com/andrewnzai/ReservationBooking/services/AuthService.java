package com.andrewnzai.ReservationBooking.services;

import com.andrewnzai.ReservationBooking.repositories.RoleRepository;
import com.andrewnzai.ReservationBooking.repositories.UserRepository;

@Service
@AllArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    
}
