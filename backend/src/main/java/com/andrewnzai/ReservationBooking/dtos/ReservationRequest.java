package com.andrewnzai.ReservationBooking.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationRequest {
    private Integer guestsNo;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate toDate;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate fromDate;
}
