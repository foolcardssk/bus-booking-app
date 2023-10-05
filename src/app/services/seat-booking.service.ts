import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bus, Seat } from '../models/bus-data.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BusManageService } from './bus-manage.service';

@Injectable({
    providedIn: 'root'
})
export class SeatBookingService {

    selectedSeats = new BehaviorSubject<{ busNo: string, seats: Seat[] }>({ busNo: '', seats: [] });
    seatsToBeBooked = new BehaviorSubject<{ busNo: string, seats: Seat[] }>({ busNo: '', seats: [] });

    constructor(private firestore: AngularFirestore, private busManageService: BusManageService) { }

    getAllBuses(): Observable<Bus[]> {
        return this.firestore.collection<Bus>('Buses').valueChanges();
    }

    bookUserSeats(busNo: string, selectedSeats: Seat[], uid: string){
        return this.busManageService.bookSeats(busNo, selectedSeats, uid);
    }
}
