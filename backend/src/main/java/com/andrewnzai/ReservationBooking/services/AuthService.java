package com.andrewnzai.ReservationBooking.services;

import java.time.Instant;
import java.util.UUID;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.andrewnzai.ReservationBooking.dtos.LoginRequest;
import com.andrewnzai.ReservationBooking.dtos.LoginResponse;
import com.andrewnzai.ReservationBooking.dtos.RefreshTokenRequest;
import com.andrewnzai.ReservationBooking.dtos.RegisterRequest;
import com.andrewnzai.ReservationBooking.emails.NotificationEmail;
import com.andrewnzai.ReservationBooking.jwt.JwtUtil;
import com.andrewnzai.ReservationBooking.models.RefreshToken;
import com.andrewnzai.ReservationBooking.models.User;
import com.andrewnzai.ReservationBooking.models.UserDetailsImpl;
import com.andrewnzai.ReservationBooking.models.VerificationToken;
import com.andrewnzai.ReservationBooking.repositories.RoleRepository;
import com.andrewnzai.ReservationBooking.repositories.UserRepository;
import com.andrewnzai.ReservationBooking.repositories.VerificationTokenRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final VerificationTokenRepository verificationTokenRepository;
    private final MailService mailService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public void signup(RegisterRequest registerRequest) throws Exception {
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            throw new Exception("Email is already in use");
        }
        else if(!roleRepository.existsByName(registerRequest.getRole())){
            throw new Exception("Role does not exist");
        }
        else{
            User user = new User();
            user.setEmail(registerRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            user.setEnabled(false);
            user.setRole(roleRepository.findByName(registerRequest.getRole()));

            String token = generateVerificationToken(user);

            mailService.sendMail(
                    new NotificationEmail("Account Verification",
                            user.getEmail(),
                            "Thank you for signing up to Reservation Booking, " +
                                    "please click on the below url to activate your account: " +
                                    "http://localhost:8080/api/auth/accountVerification/" + token)
            );

            userRepository.save(user);
        }
    }

    private void fetchUserAndEnable(VerificationToken verificationToken) {
        User user = userRepository.findByEmail(verificationToken.getUser().getEmail());
        user.setEnabled(true);
        userRepository.save(user);
    }

    private String generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);

        verificationTokenRepository.save(verificationToken);
        return token;
    }

    public void verifyAccount(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        fetchUserAndEnable(verificationToken);
    }

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(principal.getUsername());
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authenticate = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);

        User user = userRepository.findByEmail(loginRequest.getEmail());

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpirationDate(Instant.now().plusSeconds(2592000));
        refreshToken.setUser(user);
        refreshTokenRepository.save(refreshToken);

        return build(jwtUtil.generateJwtToken(authenticate)
        , loginRequest.getEmail()
        , refreshToken.getToken());
    }

    public LoginResponse refresh(RefreshTokenRequest refreshTokenRequest) throws Exception {
        
        User user = userRepository.findByEmail(refreshTokenRequest.getEmail());
        RefreshToken refreshToken = refreshTokenRepository.findByTokenAndUser(refreshTokenRequest.getRefreshToken(), user);

        boolean isNotExpired = Instant.now().isBefore(refreshToken.getExpirationDate());

        if(isNotExpired){
            return build(jwtUtil.generateJwtTokenFromUsername(refreshTokenRequest.getEmail())
            , refreshTokenRequest.getEmail()
            , refreshTokenRequest.getRefreshToken());
        }
        else if(!isNotExpired){
            refreshTokenRepository.deleteByToken(refreshTokenRequest.getRefreshToken());

            throw new Exception("Refresh Token has expired");
        }
        else {
            throw new Exception("Refresh Token is not valid");
        }
    }

    private LoginResponse build(String token, String email, String refreshToken){
        return LoginResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshToken)
                .expiresAt(Instant.now().plusSeconds(jwtUtil.getJwtExpiration()))
                .email(email)
                .build();
    }

    public boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
    }
    
}
