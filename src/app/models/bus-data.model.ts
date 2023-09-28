interface Seat {
    seatNumber: number;
    seatType: string;
    price: number;
    booked: boolean;
    name?: string;
    age?: number;
    gender?: string;
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

export interface Dimension {
    x: number;
    y: number;
    width: number;
    height: number;
    Diff: number;
}

export interface BusLayout {
    lowerDeck: lowerDeck;
    upperDeck: UpperDeck;
}