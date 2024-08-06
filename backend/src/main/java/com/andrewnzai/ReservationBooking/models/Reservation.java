package com.andrewnzai.ReservationBooking.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User reserver;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate checkIn;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate checkOut;
    @Min(1)
    @Max(9)
    private Integer occupants;
    @ManyToOne
    private Room room;
    private Long total;

    @PrePersist
    @PreUpdate
    private void validateOccupants() {
        if (occupants == null || room == null || occupants > room.getAccommodates()) {
            throw new IllegalArgumentException("Number of occupants exceeds room capacity.");
        }
    }

}
