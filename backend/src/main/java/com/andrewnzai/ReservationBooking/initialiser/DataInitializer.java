package com.andrewnzai.ReservationBooking.initialiser;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.andrewnzai.ReservationBooking.enums.RoomType;
import com.andrewnzai.ReservationBooking.models.Room;
import com.andrewnzai.ReservationBooking.repositories.RoomRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(RoomRepository roomRepository) {
        return args -> {
            if (roomRepository.count() == 0) { // Check if the table is empty
                roomRepository.saveAll(Arrays.asList(
                    new Room(RoomType.SINGLE, 100L, 1, 10),
                    new Room(RoomType.DOUBLE, 150L, 2, 20),
                    new Room(RoomType.TWIN, 150L, 2, 10),
                    new Room(RoomType.TRIPLE, 200L, 3, 10),
                    new Room(RoomType.QUAD, 250L, 4, 10),
                    new Room(RoomType.QUEEN, 180L, 2, 10),
                    new Room(RoomType.KING, 220L, 2, 10),
                    new Room(RoomType.STUDIO, 200L, 2, 5),
                    new Room(RoomType.SUITE, 300L, 4, 5),
                    new Room(RoomType.JUNIOR_SUITE, 250L, 3, 3),
                    new Room(RoomType.EXECUTIVE, 270L, 2, 2),
                    new Room(RoomType.PRESIDENTIAL_SUITE, 500L, 6, 1),
                    new Room(RoomType.ACCESSIBLE, 150L, 2, 1),
                    new Room(RoomType.CONNECTING, 280L, 4, 2),
                    new Room(RoomType.FAMILY, 300L, 4, 1)
                ));
            }
        };
    }
}
