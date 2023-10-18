import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/services/fire-auth.service';

@Component({
    selector: 'app-base-layout',
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent {
    constructor(private authService: FireAuthService, private router: Router) { }
    onSignout() {
        this.authService.userLogout()
            .then(() => {
                this.router.navigate(['/signin'])
            })
            .catch();
    }
}
