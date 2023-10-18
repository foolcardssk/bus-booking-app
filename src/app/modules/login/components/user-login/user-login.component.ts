import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { FireAuthService } from 'src/app/services/fire-auth.service';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
    faBus = faBus;
    loginForm: FormGroup<{
        email: FormControl<string>;
        password: FormControl<string>;
    }>;

    signinError: string | null = null;

    private fb = inject(FormBuilder);
    private db = inject(FireStoreService);
    private router = inject(Router);
    private authService = inject(FireAuthService);

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(30),
                    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)
                ]
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(30)
                ]
            ]
        });
    }

    onLogin() {
        this.signinError = null;
        const { email, password } = this.loginForm.value;
        this.authService.userLogin({ email, password })
            .then(user => {
                this.db.getUserRoleByUid(user.user.uid)
                    .subscribe(res => {
                        const role = res.role;
                        if (role === 'admin') {
                            this.router.navigate(['/admin/home']);
                        }
                        else {
                            this.router.navigate(['/traveller/home']);
                        }
                    });
            })
            .catch(err => {
                console.log(err);
                if (err.code === 'auth/invalid-login-credentials') {
                    this.signinError = 'Invalid Login Credentials.';
                } else {
                    this.signinError = 'An unexpected error occurred. Please try again later.';
                }
            });
    }

}
