import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { FireAuthService } from 'src/app/services/fire-auth.service';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { UserSignupComponent } from '../user-signup/user-signup.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  faBus = faBus;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: FireAuthService, private router: Router, private db: FireStoreService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin() {
    this.authService.userLogin(this.loginForm.value)
      .then(user => {
        this.db.getUserRoleByUid(user.user.uid)
          .subscribe(res => {
            const role = res.role;
            if (role === 'admin') {
              this.router.navigate(['/admin']);
            }
            else {
              this.router.navigate(['/traveller']);
            }
          });
      })
      .catch(err => {
        console.log("User signin error", err);
      });
  }

}
