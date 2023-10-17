import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatBookingService } from 'src/app/services/seat-booking.service';
import { Subscription } from 'rxjs';
import { Seat } from 'src/app/models/bus-data.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireAuthService } from 'src/app/services/fire-auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'app-booking-summary',
    templateUrl: './booking-summary.component.html',
    styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent implements OnInit, OnDestroy {

    bookingData: Seat[];
    busNo: string;
    bookingSubscription: Subscription;
    uidSubscription: Subscription;
    selectedSeatBookingSubscription: Subscription;
    uid: string;

    constructor(
        private seatBookingService: SeatBookingService,
        private router: Router,
        private snackBar: MatSnackBar,
        private auth: AngularFireAuth
    ) { }

    ngOnInit(): void {

        this.uidSubscription = this.auth.authState.subscribe(user => {
            this.uid = user.uid;
        });

        this.bookingSubscription = this.seatBookingService.seatsToBeBooked
            .subscribe(data => {
                this.bookingData = data.seats;
                this.busNo = data.busNo;
            });
    }

    ngOnDestroy(): void {
        this.bookingSubscription.unsubscribe();
        this.uidSubscription.unsubscribe();
    }

    goToPreviousPage() {
        this.router.navigate(['/traveller/home']);
    }

    proceedToPayment() {
        this.selectedSeatBookingSubscription = this.seatBookingService.bookUserSeats(this.busNo, this.bookingData, this.uid)
            .subscribe(() => {
                this.showSnackBar('Payment successful ! . Redirecting...');
                this.router.navigate(['/traveller/home']);
            });
    }

    onCancel() {
        this.showSnackBar('Booking Canceled...');
        this.router.navigate(['/traveller/home']);
    }

    showSnackBar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
        });
    }
}
