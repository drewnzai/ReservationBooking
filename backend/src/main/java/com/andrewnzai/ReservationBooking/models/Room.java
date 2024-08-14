package com.andrewnzai.ReservationBooking.models;

import com.andrewnzai.ReservationBooking.enums.RoomType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    public Room(RoomType roomType, Long price, Integer accommodates, Integer available) {
        this.roomType = roomType;
        this.price = price;
        this.accommodates = accommodates;
        this.available = available;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private RoomType roomType;
    private Long price;
    private Integer accommodates;
    private Integer available;
}
