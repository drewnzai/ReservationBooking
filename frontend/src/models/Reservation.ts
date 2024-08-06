export interface Reservation {
    id: number;
    days: number;
    roomType: string;
    total: number;
    occupants: number;
    checkIn: string;
    checkOut: string;
}