package com.andrewnzai.ReservationBooking.enums;

public enum RoomType {
    SINGLE(1),
    DOUBLE(2),
    TWIN(2),
    TRIPLE(3),
    QUAD(4),
    QUEEN(2),
    KING(2),
    STUDIO(2),
    SUITE(4),
    JUNIOR_SUITE(3),
    EXECUTIVE(2),
    PRESIDENTIAL_SUITE(6),
    ACCESSIBLE(2),
    CONNECTING(4),
    FAMILY(4),
    DELUXE(3),
    SUPERIOR(2),
    PENTHOUSE(6);

    private final int optimalOccupants;

    RoomType(int optimalOccupants) {
        this.optimalOccupants = optimalOccupants;
    }

    public int getOptimalOccupants() {
        return optimalOccupants;
    }
}
