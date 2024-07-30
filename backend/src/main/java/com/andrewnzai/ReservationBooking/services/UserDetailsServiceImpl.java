package com.andrewnzai.ReservationBooking.services;

import com.andrewnzai.ReservationBooking.models.User;
import com.andrewnzai.ReservationBooking.models.UserDetailsImpl;
import com.andrewnzai.ReservationBooking.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        return new UserDetailsImpl(user);
    }

}