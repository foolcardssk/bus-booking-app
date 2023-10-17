import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bus } from 'src/app/models/bus-data.model';
import { SeatBookingService } from 'src/app/services/seat-booking.service';

@Component({
    selector: 'app-bus-list',
    templateUrl: './bus-list.component.html',
    styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit, OnDestroy {

    buses: Bus[] = [];
    allBusesSubscription: Subscription;

    constructor(private seatBookingService: SeatBookingService) { }

    ngOnInit(): void {
        this.allBusesSubscription = this.seatBookingService.getAllBuses()
            .subscribe(
                buses => {
                    this.buses = buses;
                }
            );
    }

    ngOnDestroy(): void {
        this.allBusesSubscription.unsubscribe();
    }
}
