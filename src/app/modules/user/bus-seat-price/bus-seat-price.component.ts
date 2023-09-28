import { SeatBookingService } from 'src/app/services/seat-booking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PickedSeats } from 'src/app/models/bus-data.model';

@Component({
  selector: 'app-bus-seat-price',
  templateUrl: './bus-seat-price.component.html',
  styleUrls: ['./bus-seat-price.component.css']
})
export class BusSeatPriceComponent implements OnInit, OnDestroy {

  seats: PickedSeats[];

  selectedSeatSubscription: Subscription;

  constructor(private seatBookingService: SeatBookingService) { }

  ngOnInit(): void {
    this.selectedSeatSubscription = this.seatBookingService.selectedSeats
      .subscribe(
        seats => {
          this.seats = seats;
        }
      )
  }

  calculateTotal() {
    let total: number = 0;
    for (let seat of this.seats) {
      total += seat.seatPrice;
    }
    return total;
  }

  ngOnDestroy(): void {
    this.selectedSeatSubscription.unsubscribe();
  }

}
