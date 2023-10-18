import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { FireAuthService } from 'src/app/services/fire-auth.service';

@Component({
    selector: 'app-admin-base-layout',
    templateUrl: './admin-base-layout.component.html',
    styleUrls: ['./admin-base-layout.component.css']
})
export class AdminBaseLayoutComponent implements OnInit, OnDestroy {

    showBackBtn: boolean;
    routerEventsSubscription: Subscription;

    private router = inject(Router);
    private auth = inject(FireAuthService);

    ngOnInit() {
        this.showBackBtn = this.router.url !== '/admin/home';
        this.routerEventsSubscription = this.router.events.subscribe(
            event => {
                if (event instanceof NavigationEnd) {
                    this.showBackBtn = event.url !== '/admin/home';
                }
            }
        )
    }

    onSignout() {
        this.auth.userLogout();
        this.router.navigate(['/signin']);
    }

    onGoBack() {
        this.router.navigate(['/admin/home']);
    }

    ngOnDestroy() {
        this.routerEventsSubscription.unsubscribe();
    }
}
