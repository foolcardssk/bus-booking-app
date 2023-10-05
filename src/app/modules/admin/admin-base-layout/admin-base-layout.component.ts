import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/services/fire-auth.service';

@Component({
    selector: 'app-admin-base-layout',
    templateUrl: './admin-base-layout.component.html',
    styleUrls: ['./admin-base-layout.component.css']
})
export class AdminBaseLayoutComponent {
    constructor(private auth: FireAuthService, private router: Router) { }
    onSignout() {
        this.auth.userLogout();
        this.router.navigate(['/signin']);
    }
}
