import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { FireAuthService } from 'src/app/services/fire-auth.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  faBus = faBus;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: FireAuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [, [Validators.required]],
      email: [, [Validators.required, Validators.email]],
      password: [,
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ]
    });
  }

  onSignup() {
    this.authService.userSignup(this.registerForm.value)
      .then(user => {
        console.log('User Registered', user.credential);
        this.router.navigate(['/traveller']);
      })
      .catch(err => {
        console.log('User Creation error', err);
      });
  }

}
