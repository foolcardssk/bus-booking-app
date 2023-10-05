import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bus } from 'src/app/models/bus-data.model';
import { SeatBookingService } from 'src/app/services/seat-booking.service';

@Component({
    selector: 'app-avail-buses',
    templateUrl: './avail-buses.component.html',
    styleUrls: ['./avail-buses.component.css']
})
export class AvailBusesComponent implements OnInit {

    allBuses: Bus[] = [];
    editForm: FormGroup;

    constructor(private seatBookingService: SeatBookingService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.loadAllBuses();
        this.editForm = this.fb.group({
            departureTime: ['', Validators.required],
            arrivalTime: ['', Validators.required]
        });
    }

    loadAllBuses() {
        this.seatBookingService.getAllBuses().
            subscribe(
                buses => this.allBuses = buses
            );
    }

    editBus(bus: Bus){

    }

    deleteBus(bus: Bus){
        const confirmDelete = confirm(`Are you sure you want to delete the bus ${bus.busName}?`);
        if (confirmDelete) {
            this.seatBookingService.deleteBus(bus.busNo)
                .then(() => {
                    this.loadAllBuses();
                    console.log('Bus deleted successfully');
                })
                .catch(error => {
                    console.error('Error deleting bus:', error);
                });
        }
    }
}
