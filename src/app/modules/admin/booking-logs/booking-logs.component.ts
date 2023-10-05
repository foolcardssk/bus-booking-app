import { Component, OnInit } from '@angular/core';
import { BookingLog } from 'src/app/models/bus-data.model';
import { BusManageService } from 'src/app/services/bus-manage.service';


@Component({
    selector: 'app-booking-logs',
    templateUrl: './booking-logs.component.html',
    styleUrls: ['./booking-logs.component.css']
})
export class BookingLogsComponent implements OnInit {

    bookingLogs: BookingLog[] = [];

    constructor(private busManageService: BusManageService) { }

    ngOnInit(): void {
        this.loadBookingLogs();
    }

    loadBookingLogs() {
        this.busManageService.getAllBookingLogs()
            .subscribe(
                logs => this.bookingLogs = logs
            );
    }

    cancelBooking(log: BookingLog) {
        
    }
}
