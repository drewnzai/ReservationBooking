package com.andrewnzai.ReservationBooking.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvailableRooms {
    private String roomType;
    private Long total;
    private Long days;
}
