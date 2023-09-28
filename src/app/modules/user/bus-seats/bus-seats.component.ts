import { Component } from '@angular/core';
import { BusLayout, Dimension } from 'src/app/models/bus-data.model';

@Component({
  selector: 'app-bus-seats',
  templateUrl: './bus-seats.component.html',
  styleUrls: ['./bus-seats.component.css']
})
export class BusSeatsComponent {

  scale: number = 0.8;

  onSeatClick(seatNumber: string) {
    console.log(seatNumber)
  }


  busLayout: any = {
    lowerDeck: {
      row1: this.generateSeats(9, 'seated'),
      row2: this.generateSeats(9, 'seated'),
      row3: this.generateSeats(5, 'sleeper')
    },
    upperDeck: {
      row1: this.generateSeats(5, 'sleeper'),
      row2: this.generateSeats(5, 'sleeper'),
      row3: this.generateSeats(5, 'sleeper')
    }
  };

  private generateSeats(count: number, seatType: string) {
    const seats = [];
    for (let i = 1; i <= count; i++) {
      seats.push({
        price: 50,
        booked: i % 3 === 0,
        name: `Passenger ${i}`,
        age: 30,
        gender: i % 2 === 0 ? 'female' : 'male',
        seatType,
        seatNumber: `R${i}`
      });
    }
    return seats;
  }


}

