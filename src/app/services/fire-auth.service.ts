import { Injectable, inject } from '@angular/core';
import { Creds } from '../models/credentials.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root'
})
export class FireAuthService {

    private auth = inject(AngularFireAuth);

    userLogin(creds: Creds) {
        return this.auth.signInWithEmailAndPassword(creds.email.toLowerCase(), creds.password);
    }

    userSignup(creds: Creds) {
        return this.auth.createUserWithEmailAndPassword(creds.email.toLowerCase(), creds.password);
    }

    userLogout() {
        return this.auth.signOut()
    }

}
