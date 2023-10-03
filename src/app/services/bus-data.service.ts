import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Bus } from '../models/bus-data.model';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BusDataService {
    constructor(private firestore: AngularFirestore) { }

    private generateRandomBusNo(): Observable<string> {
        const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const timestamp = new Date().getTime();
        let result = '';

        // timestamp as seed for randomness
        for (let i = 0; i < 6; i++) {
            const charIndex = (timestamp + i) % alphanumeric.length;
            result += alphanumeric.charAt(charIndex);
        }

        return from(new Promise<string>((resolve) => {
            resolve(result);
        }));
    }

    private generateSeats(count: number, seatType: string, row: number) {
        const seats = [];
        const price = seatType === 'seated' ? 700 : seatType === 'sleeper-lower' ? 1200 : seatType === 'sleeper-upper' ? 1100 : 0;

        for (let i = 1; i <= count; i++) {
            seats.push({
                price,
                booked: false,
                seatType,
                seatNumber: `R${row}${i}`,
            });
        }

        return seats;
    }

    private generateBusLayout(busName: string): Bus {
        return {
            lowerDeck: {
                row1: this.generateSeats(9, 'seated', 1),
                row2: this.generateSeats(9, 'seated', 2),
                row3: this.generateSeats(5, 'sleeper-lower', 3),
            },
            upperDeck: {
                row1: this.generateSeats(5, 'sleeper-upper', 4),
                row2: this.generateSeats(5, 'sleeper-upper', 5),
                row3: this.generateSeats(5, 'sleeper-upper', 6),
            },
            busName: busName,
            busNo: ''
        };
    }

    private pushBusToFirestore(bus: Bus): void {
        const busId = bus.busNo;

        this.firestore.collection('Buses').doc(busId).set(bus)
            .then(() => console.log(`Bus with ID ${busId} added to Firestore`))
            .catch(error => console.error('Error adding bus to Firestore:', error));
    }

    createNewBus(source: string, destination: string, busName: string, model: string): void {
        const newBus: Bus = {
            source,
            destination,
            model,
            ...this.generateBusLayout(busName),
        };

        this.generateRandomBusNo().subscribe((randomBusNo) => {
            newBus.busNo = randomBusNo;
            this.pushBusToFirestore(newBus);
        });

    }
}
