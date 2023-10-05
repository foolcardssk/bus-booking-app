import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { FireStoreService } from '../services/fire-store.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root',
})
export class AdminAuthGuard {

    constructor(private db: FireStoreService, private auth: AngularFireAuth, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        return this.auth.authState.pipe(
            take(1),
            switchMap(user => {
                if (!user) {
                    this.router.navigate(['/signin']);
                    return Promise.resolve(false);
                }

                return this.db.getUserRoleByUid(user.uid).pipe(
                    map(res => {
                        if (res && res.role === 'admin') {
                            return true;
                        } else {
                            this.router.navigate(['/unauthorized']);
                            return false;
                        }
                    })
                );
            })
        );
    }
}
