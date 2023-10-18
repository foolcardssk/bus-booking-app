import { SeatBookingService } from 'src/app/services/seat-booking.service';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Seat } from 'src/app/models/bus-data.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {

    busNo: string;
    selectedSeats: Seat[];

    personalDetailForms: FormGroup<{
        age: FormControl<number>;
        name: FormControl<string>;
        seatNo: FormControl<string>;
        gender: FormControl<string>;
    }>[];

    selectedSeatSubscription: Subscription;

    private fb = inject(FormBuilder);
    private router = inject(Router);
    private seatBookingService = inject(SeatBookingService);

    ngOnInit(): void {
        this.selectedSeatSubscription = this.seatBookingService
            .selectedSeatsToPersonalInfoPage
            .subscribe(
                seats => {
                    this.selectedSeats = seats.seats;
                    this.busNo = seats.busNo;
                    this.personalDetailForms = this.selectedSeats.map(seat => this.createSeatForm(seat));
                }
            );
    }

    private createSeatForm(seat: Seat): FormGroup {
        const defaultGender = seat.seatConstraint ? 'female' : 'male';
        return this.fb.group({
            seatNo: [seat.seatNumber],
            name: [,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.pattern(/^[A-Za-z\s]+$/)
                ]
            ],
            age: [,
                [Validators.required, Validators.min(5), Validators.max(80)]
            ],
            gender: [defaultGender, [Validators.required]],
        });
    }

    hasSeatConstraint(seatNo: string): boolean {
        const seat = this.selectedSeats.find(seat => seat.seatNumber === seatNo);
        return seat.seatConstraint;
    }

    areAllFormsValid(): boolean {
        return this.personalDetailForms.every(form => form.valid);
    }

    onSubmit(): void {
        this.personalDetailForms.forEach((form, index) => {
            const seat = this.selectedSeats[index];
            if (seat) {
                seat.name = form.value.name;
                seat.age = form.value.age;
                seat.gender = form.value.gender;
            }
        });
        this.seatBookingService.seatsToBeBooked.next({
            busNo: this.busNo,
            seats: this.selectedSeats
        })
        this.router.navigate(['/traveller/booking-summary']);
    }

    goToPreviousPage() {
        this.router.navigate(['/traveller/home']);
    }

    ngOnDestroy(): void {
        this.selectedSeatSubscription.unsubscribe();
    }
}
