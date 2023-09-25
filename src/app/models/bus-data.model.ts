interface SleeperCar {
    booked: boolean;
    name?: string;
    age?: number;
    gender?: string;
}

interface SeatedCar {
    booked: boolean;
    name?: string;
    age?: number;
    gender?: string;
}

interface lowerDeck {
    row1: SeatedCar[];
    row2: SeatedCar[];
    row3: SleeperCar[];
}
interface UpperDeck {
    row1: SleeperCar[];
    row2: SleeperCar[];
    row3: SleeperCar[];
}

export interface BusLayout {
    lowerDeck: lowerDeck;
    upperDeck: UpperDeck;
}