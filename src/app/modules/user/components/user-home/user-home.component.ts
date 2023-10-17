import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/services/fire-auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {

  constructor(private authService: FireAuthService, private router: Router){}
  onSignout(){
    this.authService.userLogout()
    .then(user=>{
      this.router.navigate(['/signin'])
    })
    .catch();
  }
}
