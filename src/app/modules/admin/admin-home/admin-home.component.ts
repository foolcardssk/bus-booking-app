import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

    constructor(private router: Router) { }

    onManage() {
        this.router.navigate(['/admin/manage']);
    }
    onBookingLogs() {
        this.router.navigate(['/admin/booking-logs']);
    }
    onUserView() {
        this.router.navigate(['/traveller/home']);
    }
}
