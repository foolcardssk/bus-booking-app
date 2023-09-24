import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserRole } from '../models/firestore-data.model';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService implements OnInit {

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {

  }

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
