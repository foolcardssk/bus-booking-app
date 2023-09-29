import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { FireAuthService } from 'src/app/services/fire-auth.service';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  faBus = faBus;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: FireAuthService, private db: FireStoreService, private router: Router) { }

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
        const uid = user.user.uid;
        this.db.addUserRole(uid, 'peasant')
          .then(() => {
            console.log('peasant role created !');
            this.router.navigate(['/traveller/home']);
          })
          .catch(err=>{
            console.error('Error setting user role:', err);
          });
      })
      .catch(err => {
        console.log('User Creation error', err);
      });
  }

}
