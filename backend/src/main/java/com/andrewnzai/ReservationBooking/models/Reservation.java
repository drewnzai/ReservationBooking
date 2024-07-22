package com.andrewnzai.ReservationBooking.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Integer occupants;
    @ManyToOne
    private Room room;

}
