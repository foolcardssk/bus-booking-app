import { Component, OnInit, inject } from '@angular/core';
import { Observable, map, take, tap } from 'rxjs';
import { Seat } from 'src/app/models/bus-data.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SeatBookingService } from 'src/app/services/seat-booking.service';

@Component({
    selector: 'app-booking-summary',
    templateUrl: './booking-summary.component.html',
    styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent implements OnInit {

    private auth = inject(AngularFireAuth);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);
    private seatBookingService = inject(SeatBookingService);

    uid: string;
    busNo: string;
    bookingData$: Observable<Seat[]>;

    ngOnInit(): void {

        this.auth.authState.pipe(take(1)).subscribe(user => {
            this.uid = user?.uid;
        });

        // FIXME : busNo is undefined !
        this.bookingData$ = this.seatBookingService.seatsToBeBooked
            .pipe(
                tap(data => data.busNo),
                map(data => data.seats)
            )
    }

    goToPreviousPage() {
        this.router.navigate(['/traveller/home']);
    }

    proceedToPayment() {
        this.bookingData$.pipe(take(1)).subscribe({
            next: seats => {
                if (this.uid && seats) {
                    this.seatBookingService.bookUserSeats(this.busNo, seats, this.uid)
                        .pipe(take(1))
                        .subscribe(() => {
                            this.showSnackBar('Payment successful! Redirecting...');
                            this.router.navigate(['/traveller/home']);
                        });
                } else {
                    console.error('UID or seats is not available for payment.');
                }
            }
        });
    }


    onCancel() {
        this.showSnackBar('Booking Canceled...');
        this.router.navigate(['/traveller/home']);
    }

    showSnackBar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 2000,
        });
    }

    trackBySeatNo(seat: Seat) {
        return seat.seatNumber;
    }
}
