import { Component, OnInit, inject } from '@angular/core';
import { BookingLog } from 'src/app/models/bus-data.model';
import { BusManageService } from 'src/app/services/bus-manage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-booking-logs',
    templateUrl: './booking-logs.component.html',
    styleUrls: ['./booking-logs.component.css']
})
export class BookingLogsComponent implements OnInit {

    private snackBar = inject(MatSnackBar);
    private busManageService = inject(BusManageService);

    bookingLogs$: Observable<BookingLog[]>;

    ngOnInit(): void {
        this.bookingLogs$ = this.busManageService.getAllBookingLogs();
    }

    cancelBooking(log: BookingLog) {
        this.busManageService.cancelBooking(log)
            .then(() => {
                this.snackBar.open('Booking canceled successfully!', 'Close', {
                    duration: 3000,
                });
            })
            .catch((error) => {
                console.error('Error canceling booking:', error);
                this.snackBar.open('Error canceling booking. Please try again.', 'Close', {
                    duration: 3000,
                });
            });
    }

    trackByTime(log: BookingLog) {
        return log.timestamp;
    }
}
