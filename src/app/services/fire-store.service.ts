import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserRole } from '../models/firestore-data.model';

@Injectable({
    providedIn: 'root'
})
export class FireStoreService {

    private afs = inject(AngularFirestore);

    addUserRole(uid: string, role: string): Promise<void> {
        const userRole: UserRole = { uid, role };
        return this.afs.collection<UserRole>('userRoles').doc(uid).set(userRole);
    }

    getUserRoleByUid(uid: string) {
        return this.afs.collection<UserRole>('userRoles')
            .doc<UserRole>(uid)
            .valueChanges();
    }
}
