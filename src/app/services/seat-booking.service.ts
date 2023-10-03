import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bus, PickedSeats } from '../models/bus-data.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class SeatBookingService {

    selectedSeats = new BehaviorSubject<{ seats: PickedSeats[], busNo: string }>({ seats: [], busNo: '' });

    constructor(private firestore: AngularFirestore) { }

    getAllBuses(): Observable<Bus[]> {
        return this.firestore.collection<Bus>('Buses').valueChanges();
    }
}
