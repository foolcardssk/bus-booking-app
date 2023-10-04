export interface Seat {
    seatNumber: string;
    seatType: string;
    price: number;
    booked: boolean;
    name?: string;
    age?: number;
    gender?: string;
    seatConstraint?: boolean;
}

interface lowerDeck {
    row1: Seat[];
    row2: Seat[];
    row3: Seat[];
}

interface UpperDeck {
    row1: Seat[];
    row2: Seat[];
    row3: Seat[];
}

export interface Bus {
    departureTime?: string;
    arrivalTime?: string;
    source?: string;
    destination?: string;
    busName: string;
    model?: string;
    lowerDeck: lowerDeck;
    upperDeck: UpperDeck;
    busNo: string;
    availSeats: number;
}
