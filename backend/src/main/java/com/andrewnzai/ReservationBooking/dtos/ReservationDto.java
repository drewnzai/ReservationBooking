package com.andrewnzai.ReservationBooking.dtos;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {
    private String roomType;
    private Long total;
    private Long days;
    private Integer occupants;
    private LocalDate checkIn;
    private LocalDate checkOut;
}
