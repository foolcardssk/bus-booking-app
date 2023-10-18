import { SeatBookingService } from 'src/app/services/seat-booking.service';
import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
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

    busNo: string;
    seats: Seat[];

    selectedSeatSubscription: Subscription;

    private seatBookingService = inject(SeatBookingService);
    private router = inject(Router);

    ngOnInit(): void {
        this.selectedSeatSubscription = this.seatBookingService.selectedSeats
            .pipe(
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
        this.seatBookingService.selectedSeatsToPersonalInfoPage.next({
            busNo: this.busNo,
            seats: this.seats,
            index: this.index
        });
        this.seatBookingService.clearSelectedSeats();
        this.router.navigate(['/traveller/details']);
    }

    ngOnDestroy(): void {
        this.selectedSeatSubscription.unsubscribe();
    }

}
