import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BusLayout, PickedSeats } from '../models/bus-data.model';

@Injectable({
  providedIn: 'root'
})
export class SeatBookingService {

  bus: BusLayout;
  selectedSeats = new BehaviorSubject<{ seats: PickedSeats[], busNo: string }>({ seats: [], busNo: '' });

  constructor() { }

  initSeat() {
    this.bus = {
      lowerDeck: {
        row1: this.generateSeats(9, 'seated', 1),
        row2: this.generateSeats(9, 'seated', 2),
        row3: this.generateSeats(5, 'sleeper', 3),
      },
      upperDeck: {
        row1: this.generateSeats(5, 'sleeper', 4),
        row2: this.generateSeats(5, 'sleeper', 5),
        row3: this.generateSeats(5, 'sleeper', 6),
      },
      busName: 'My Bus',
      busNo: 'LNK03214'
    };
  }

  generateSeats(count: number, seatType: string, row: number) {
    const seats = [];
    for (let i = 1; i <= count; i++) {
      const isBooked = Math.random() < 0.5;
      const gender = isBooked ? (Math.random() < 0.5 ? 'male' : 'female') : '';
      seats.push({
        price: 50,
        booked: isBooked,
        name: isBooked ? `Passenger ${i}` : '',
        age: isBooked ? 30 : null,
        gender: gender,
        seatType,
        seatNumber: `R${row}${i}`,
      });
    }
    return seats;
  }
}
