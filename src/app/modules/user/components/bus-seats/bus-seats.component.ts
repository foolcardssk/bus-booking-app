import { Component, Input, inject } from '@angular/core';
import { Bus, Seat } from 'src/app/models/bus-data.model';
import { SeatBookingService } from 'src/app/services/seat-booking.service';

@Component({
    selector: 'app-bus-seats',
    templateUrl: './bus-seats.component.html',
    styleUrls: ['./bus-seats.component.css']
})
export class BusSeatsComponent {

    @Input('bus-seat') bus: Bus;
    @Input('track-index') index: number;

    scale: number = 0.8;
    pickedSeats: Seat[] = [];

    private seatBookingService = inject(SeatBookingService);

    isSeatSelected(seatNo: string) {
        for (let seat of this.pickedSeats) {
            if (seat.seatNumber === seatNo) {
                return 'lightgreen';
            }
        }
        return '#ffffff';
    }

    onUnbookedSeatClick(seatNo: string, seatType: string, seatPrice: number, seatConstraint: boolean) {
        for (let seat of this.pickedSeats) {
            if (seat.seatNumber === seatNo) {
                this.pickedSeats.splice(this.pickedSeats.indexOf(seat), 1);
                return;
            }
        }
        if (this.pickedSeats.length < 5) {
            this.pickedSeats.push({
                seatNumber: seatNo,
                seatType: seatType,
                price: seatPrice,
                seatConstraint: seatConstraint,
                booked: false
            });
        }
        this.seatBookingService.selectedSeats.next({
            seats: this.pickedSeats,
            busNo: this.bus.busNo,
            index: this.index
        });
    }

    trackByIndex(index: number) {
        return index;
    }

    trackByNo(seat: Seat) {
        return seat.seatNumber;
    }

}

