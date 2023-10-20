import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Bus, Seat } from '../models/bus-data.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusManageService } from './bus-manage.service';

@Injectable({
    providedIn: 'root'
})
export class SeatBookingService {

    seatsToBeBooked = new ReplaySubject<{ busNo: string, seats: Seat[] }>(0);
    selectedSeats = new BehaviorSubject<{ busNo: string, seats: Seat[], index: number }>({ busNo: '', seats: [], index: 0 });
    selectedSeatsToPersonalInfoPage = new BehaviorSubject<{ busNo: string, seats: Seat[], index: number }>({ busNo: '', seats: [], index: 0 });

    private firestore = inject(AngularFirestore);
    private busManageService = inject(BusManageService);

    getAllBuses(): Observable<Bus[]> {
        return this.firestore.collection<Bus>('Buses').valueChanges();
    }

    clearSelectedSeats() {
        this.selectedSeats.next({ busNo: '', seats: [], index: 0 });
    }

    bookUserSeats(busNo: string, selectedSeats: Seat[], uid: string) {
        return this.busManageService.bookSeats(busNo, selectedSeats, uid);
    }

    deleteBus(busNo: string) {
        return this.busManageService.deleteBus(busNo);
    }
}
