import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PickedSeats } from '../models/bus-data.model';

@Injectable({
  providedIn: 'root'
})
export class SeatBookingService {

  
  selectedSeats = new BehaviorSubject<{ seats: PickedSeats[], busNo: string }>({ seats: [], busNo: '' });
  
  constructor() { }

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
