import { Component } from '@angular/core';

@Component({
  selector: 'app-login-base',
  templateUrl: './login-base.component.html',
  styleUrls: ['./login-base.component.css']
})
export class LoginBaseComponent {
  signinState: boolean = true;
  switchStateRegister(){
      this.signinState = false;
  }
  switchStateLogin(){
      this.signinState = true;
  }

}
