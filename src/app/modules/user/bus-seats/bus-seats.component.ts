import { Component, OnInit } from '@angular/core';
import { BusLayout, PickedSeats } from 'src/app/models/bus-data.model';
import { SeatBookingService } from 'src/app/services/seat-booking.service';

@Component({
  selector: 'app-bus-seats',
  templateUrl: './bus-seats.component.html',
  styleUrls: ['./bus-seats.component.css']
})
export class BusSeatsComponent implements OnInit {

  scale: number = 0.8;
  busLayout: BusLayout;
  pickedSeats: PickedSeats[] = [];

  constructor(private seatBookingService: SeatBookingService) { }

  ngOnInit(): void {
    this.busLayout = {
      lowerDeck: {
        row1: this.seatBookingService.generateSeats(9, 'seated', 1),
        row2: this.seatBookingService.generateSeats(9, 'seated', 2),
        row3: this.seatBookingService.generateSeats(5, 'sleeper', 3),
      },
      upperDeck: {
        row1: this.seatBookingService.generateSeats(5, 'sleeper', 4),
        row2: this.seatBookingService.generateSeats(5, 'sleeper', 5),
        row3: this.seatBookingService.generateSeats(5, 'sleeper', 6),
      },
    };
  }

  isSeatSelected(seatNo: string) {
    for (let seat of this.pickedSeats) {
      if (seat.seatNo === seatNo) {
        console.log('Selected Seat:', seatNo);
        return 'lightgreen';
      }
    }
    return '#ffffff';
  }


  onUnbookedSeatClick(seatNo: string, seatType: string, seatPrice: number) {
    for (let seat of this.pickedSeats) {
      if (seat.seatNo === seatNo) {
        this.pickedSeats.splice(this.pickedSeats.indexOf(seat), 1);
        return;
      }
    }
    if (this.pickedSeats.length < 5) {
      this.pickedSeats.push({ seatNo: seatNo, seatType: seatType, seatPrice: seatPrice });
    }

    console.log('seats picked : ', this.pickedSeats);

    this.seatBookingService.selectedSeats.next(this.pickedSeats);
  }

}

