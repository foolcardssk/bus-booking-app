import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Bus } from 'src/app/models/bus-data.model';
import { BusManageService } from 'src/app/services/bus-manage.service';
import { SeatBookingService } from 'src/app/services/seat-booking.service';

@Component({
    selector: 'app-avail-buses',
    templateUrl: './avail-buses.component.html',
    styleUrls: ['./avail-buses.component.css']
})
export class AvailBusesComponent implements OnInit {

    private fb = inject(FormBuilder);
    private busManageService = inject(BusManageService);
    private seatBookingService = inject(SeatBookingService);

    selectedBus: Bus;
    allBuses$: Observable<Bus[]>;
    showEditForm: boolean = false;

    editForm: FormGroup<{
        departureTime: FormControl<string>;
        arrivalTime: FormControl<string>;
    }>;


    ngOnInit(): void {
        this.allBuses$ = this.seatBookingService.getAllBuses();

        this.editForm = this.fb.group({
            departureTime: ['',
                [
                    Validators.required,
                    Validators.pattern(/^([0-9]|0[0-9]|1[0-2]):[0-5][0-9]\s(?:AM|PM)$/i)
                ]
            ],
            arrivalTime: ['',
                [
                    Validators.required,
                    Validators.pattern(/^([0-9]|0[0-9]|1[0-2]):[0-5][0-9]\s(?:AM|PM)$/i)
                ]
            ]
        });
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
        ).then(() => {
            this.showEditForm = false;
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
                .catch(error => {
                    console.error('Error deleting bus:', error);
                });
        }
    }

    trackByNo(bus: Bus) {
        return bus.busNo;
    }
}
