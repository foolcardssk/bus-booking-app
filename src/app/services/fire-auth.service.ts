import { Injectable } from '@angular/core';
import { Creds } from '../models/credentials.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root'
})
export class FireAuthService {

    constructor(private auth: AngularFireAuth) { }

    userLogin(creds: Creds) {
        return this.auth.signInWithEmailAndPassword(creds.email, creds.password);
    }

    userSignup(creds: Creds) {
        return this.auth.createUserWithEmailAndPassword(creds.email, creds.password);
    }

    userLogout() {
        return this.auth.signOut()
    }

}
