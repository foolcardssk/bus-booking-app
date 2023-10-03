import { SeatBookingService } from 'src/app/services/seat-booking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Seat } from 'src/app/models/bus-data.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {

    selectedSeats: Seat[];
    busNo: string;
    selectedSeatSubscription: Subscription;
    selectedSeatBookingSubscription: Subscription;
    personalDetailForms: FormGroup[] = [];

    constructor(
        private seatBookingService: SeatBookingService,
        private fb: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.selectedSeatSubscription = this.seatBookingService.selectedSeats
            .subscribe(
                seats => {
                    this.selectedSeats = seats.seats;
                    this.busNo = seats.busNo;
                    this.personalDetailForms = this.selectedSeats.map(seat => this.createSeatForm(seat));
                }
            );
    }

    ngOnDestroy(): void {
        this.selectedSeatSubscription.unsubscribe();
    }

    private createSeatForm(seat: Seat): FormGroup {
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
                [Validators.required, Validators.min(5)]
            ],
            gender: [,
                [Validators.required]
            ],
        });
    }

    onSubmit(): void {
        this.personalDetailForms.forEach((form, index) => {
            const seat = this.selectedSeats[index];

            if (seat) {
                seat.name = form.value.name;
                seat.age = form.value.age;
                seat.gender = form.value.gender;
                seat.seatConstraint = false;
            }
        });

        this.selectedSeatBookingSubscription = this.seatBookingService.bookUserSeats(this.busNo, this.selectedSeats)
            .subscribe(() => {
                console.log('Seats booked successfully');
            });
        // this.selectedSeatBookingSubscription.unsubscribe();
    }

    goToPreviousPage() {
        this.router.navigate(['/traveller/home']);
    }

}
