import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Bus, Seat } from '../models/bus-data.model';
import { map, catchError, switchMap, Observable, from, tap, throwError } from 'rxjs';
import { of } from 'rxjs';
import * as md5 from 'md5';

@Injectable({
    providedIn: 'root'
})
export class BusManageService {
    constructor(private firestore: AngularFirestore) { }

    private generateBusNo(source: string, destination: string, busName: string): string {
        const inputString = `${source}-${destination}-${busName}`;
        const hash = md5(inputString);
        return hash.substring(0, 8).toUpperCase();
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
                name: '',
                age: '',
                gender: '',
                seatConstraint: false
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
            busNo: '',
            availSeats: 38
        };
    }

    private pushBusToFirestore(bus: Bus): Promise<void> {
        const busId = bus.busNo;

        return this.firestore.collection('Buses').doc(busId).set(bus);
    }

    bookSeats(busNo: string, selectedSeats: Seat[]) {
        return this.firestore
            .collection('Buses')
            .doc(busNo)
            .get()
            .pipe(
                switchMap(doc => {
                    if (doc.exists) {
                        const bus: Bus = doc.data() as Bus;
                        selectedSeats.forEach((selectedSeat) => {
                            const seat = this.findSeat(bus, selectedSeat.seatNumber);
                            if (seat) {
                                seat.booked = true;
                                seat.name = selectedSeat.name;
                                seat.age = selectedSeat.age;
                                seat.gender = selectedSeat.gender;
                                if (seat.gender === 'female' && [1, 2, 4, 5].includes(+seat.seatNumber.charAt(1))) {
                                    const adjacentSeat = this.findAdjacentSeat(bus, seat);
                                    if (adjacentSeat) {
                                        adjacentSeat.seatConstraint = true;
                                    }
                                }
                            }
                        });

                        return this.firestore
                            .collection('Buses')
                            .doc(busNo)
                            .set(bus)
                            .then(() => console.log('Seats booked successfully'))
                            .catch((error) =>
                                console.error('Error booking seats:', error)
                            );
                    } else {
                        console.error('Bus not found with the given bus number:', busNo);
                        return Promise.reject('Bus not found');
                    }
                })
            );
    }

    findAdjacentSeat(bus: Bus, seat: Seat): Seat | undefined {
        const { row, col } = this.getSeatRowAndCol(seat.seatNumber);
        const adjacentRow = row === 1 ? 2 : row === 2 ? 1 : row === 4 ? 5 : row === 5 ? 4 : 0;
        if (adjacentRow > 0) {
            return this.findSeat(bus, `R${adjacentRow}${col}`);
        }
        return undefined;
    }

    getSeatRowAndCol(seatNumber: string): { row: number; col: number } {
        const match = seatNumber.match(/R(\d+)(\d+)/);
        if (match) {
            return { row: +match[1], col: +match[2] };
        }
        return { row: 0, col: 0 };
    }



    createNewBus(source: string, destination: string, busName: string, model: string, departureTime: string, arrivalTime: string): void {
        const newBus: Bus = {
            departureTime,
            arrivalTime,
            source,
            destination,
            model,
            ...this.generateBusLayout(busName),
            busNo: this.generateBusNo(source, destination, busName)
        };

        this.pushBusToFirestore(newBus)
            .catch(error => console.error('Error adding bus to Firestore:', error));
    };

    private findSeat(bus: Bus, seatNumber: string): Seat | undefined {
        const allSeats = [
            ...bus.lowerDeck.row1,
            ...bus.lowerDeck.row2,
            ...bus.lowerDeck.row3,
            ...bus.upperDeck.row1,
            ...bus.upperDeck.row2,
            ...bus.upperDeck.row3
        ];

        return allSeats.find(seat => seat.seatNumber === seatNumber);
    }

    cancelSeat(busNo: string, seatNumber: string) {
        return this.firestore.collection('Buses').doc(busNo).get()
            .pipe(
                map(doc => {
                    if (doc.exists) {
                        const bus: Bus = doc.data() as Bus;
                        const seat = this.findSeat(bus, seatNumber);
                        if (seat) {
                            seat.booked = false;
                            seat.name = '';
                            seat.age = null;
                            seat.gender = '';
                            return this.pushBusToFirestore(bus);
                        } else {
                            console.error('Seat not found with the given seat number:', seatNumber);
                            return of(null);
                        }
                    } else {
                        console.error('Bus not found with the given bus number:', busNo);
                        return of(null);
                    }
                }),
                catchError(err => {
                    console.error('Error retrieving bus data:', err);
                    return of(null);
                })
            );
    }
}
