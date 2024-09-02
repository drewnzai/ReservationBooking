package com.andrewnzai.ReservationBooking.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {
    private Long id;
    private String roomType;
    private Long total;
    private Long days;
    private Integer occupants;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private LocalDate reservationDate;
    private String reserver;
}
