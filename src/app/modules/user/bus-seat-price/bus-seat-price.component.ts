import { SeatBookingService } from 'src/app/services/seat-booking.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, filter, map, tap } from 'rxjs';
import { Seat } from 'src/app/models/bus-data.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bus-seat-price',
    templateUrl: './bus-seat-price.component.html',
    styleUrls: ['./bus-seat-price.component.css']
})
export class BusSeatPriceComponent implements OnInit, OnDestroy {

    @Input('track-index') index: number;
    seats: Seat[];
    busNo: string;

    selectedSeatSubscription: Subscription;

    constructor(private seatBookingService: SeatBookingService, private router: Router) { }

    ngOnInit(): void {
        this.selectedSeatSubscription = this.seatBookingService.selectedSeats
            .pipe(
                tap(data => console.log('Received data:', data)),
                filter(data => data.index === this.index)
            )
            .subscribe(
                seats => {
                    this.seats = seats.seats;
                    this.busNo = seats.busNo;
                }
            );
    }

    calculateTotal() {
        let total: number = 0;
        for (let seat of this.seats) {
            total += seat.price;
        }
        return total;
    }

    onContinueToDetailsPage() {
        this.router.navigate(['/traveller/details']);
    }

    ngOnDestroy(): void {
        this.selectedSeatSubscription.unsubscribe();
    }

}
