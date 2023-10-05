import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bus } from 'src/app/models/bus-data.model';
import { BusManageService } from 'src/app/services/bus-manage.service';
import { SeatBookingService } from 'src/app/services/seat-booking.service';

@Component({
    selector: 'app-avail-buses',
    templateUrl: './avail-buses.component.html',
    styleUrls: ['./avail-buses.component.css']
})
export class AvailBusesComponent implements OnInit {

    allBuses: Bus[] = [];
    showEditForm: boolean = false;
    selectedBus: Bus;
    editForm: FormGroup;

    constructor(private seatBookingService: SeatBookingService, private fb: FormBuilder, private busManageService: BusManageService) { }

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

    editBus(bus: Bus) {
        this.showEditForm = true;
        this.selectedBus = bus;

        this.editForm.setValue({
            departureTime: bus.departureTime,
            arrivalTime: bus.arrivalTime
        });
    }

    saveChanges() {
        this.selectedBus.departureTime = this.editForm.value.departureTime;
        this.selectedBus.arrivalTime = this.editForm.value.arrivalTime;

        this.busManageService.editBusInfo(
            this.selectedBus.busNo,
            this.selectedBus.departureTime,
            this.selectedBus.arrivalTime
        )
            .then(() => {
                this.showEditForm = false;
                this.loadAllBuses();
                console.log('Bus information updated successfully');
            })
            .catch(error => {
                console.error('Error updating bus information:', error);
            });
    }

    cancel() {
        this.showEditForm = false;
    }

    deleteBus(bus: Bus) {
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
