import { Component } from '@angular/core';
import { FireAuthService } from 'src/app/services/fire-auth.service';

@Component({
  selector: 'app-admin-base-layout',
  templateUrl: './admin-base-layout.component.html',
  styleUrls: ['./admin-base-layout.component.css']
})
export class AdminBaseLayoutComponent {
    constructor(private auth: FireAuthService){}
    onSignout(){
        this.auth.userLogout();
    }
}
