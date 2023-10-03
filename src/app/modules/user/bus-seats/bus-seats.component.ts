import { Component, OnInit, Input } from '@angular/core';
import { Bus, PickedSeats } from 'src/app/models/bus-data.model';
import { SeatBookingService } from 'src/app/services/seat-booking.service';

@Component({
    selector: 'app-bus-seats',
    templateUrl: './bus-seats.component.html',
    styleUrls: ['./bus-seats.component.css']
})
export class BusSeatsComponent implements OnInit {

    scale: number = 0.8;
    @Input('bus-seat') Bus: Bus;
    pickedSeats: PickedSeats[] = [];


    constructor(private seatBookingService: SeatBookingService) { }

    ngOnInit(): void {

    }

    isSeatSelected(seatNo: string) {
        for (let seat of this.pickedSeats) {
            if (seat.seatNo === seatNo) {
                return 'lightgreen';
            }
        }
        return '#ffffff';
    }


    onUnbookedSeatClick(seatNo: string, seatType: string, seatPrice: number) {
        for (let seat of this.pickedSeats) {
            if (seat.seatNo === seatNo) {
                this.pickedSeats.splice(this.pickedSeats.indexOf(seat), 1);
                return;
            }
        }
        if (this.pickedSeats.length < 5) {
            this.pickedSeats.push({ seatNo: seatNo, seatType: seatType, seatPrice: seatPrice });
        }
        this.seatBookingService.selectedSeats.next({
            seats: this.pickedSeats,
            busNo: this.Bus.busNo
        });
    }

}

