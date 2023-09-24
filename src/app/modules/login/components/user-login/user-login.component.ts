import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { FireAuthService } from 'src/app/services/fire-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  faBus = faBus;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: FireAuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin() {
    this.authService.userLogin(this.loginForm.value)
    .then(user=>{
      console.log("User signed in", user.credential);
      this.router.navigate(['/traveller']);
    })
    .catch(err=>{
      console.log("User signin error", err);
    });
  }

}
