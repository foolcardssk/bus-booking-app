import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from 'src/app/models/bus-data.model';
import { SeatBookingService } from 'src/app/services/seat-booking.service';

@Component({
    selector: 'app-bus-list',
    templateUrl: './bus-list.component.html',
    styleUrls: ['./bus-list.component.css']
})
export class BusListComponent {

    private seatBookingService = inject(SeatBookingService);

    buses$: Observable<Bus[]>;

    ngOnInit(): void {
        this.buses$ = this.seatBookingService.getAllBuses();
    }

    trackByNo(bus: Bus) {
        return bus.busNo;
    }
}
