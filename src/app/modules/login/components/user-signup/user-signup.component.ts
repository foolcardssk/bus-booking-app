import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';
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
    registerForm: FormGroup<{
        username: FormControl<string>;
        email: FormControl<string>;
        password: FormControl<string>;
    }>;

    signupError: string | null = null;

    private fb = inject(FormBuilder);
    private db = inject(FireStoreService);
    private router = inject(Router);
    private authService = inject(FireAuthService);

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            username: ['',
                [
                    Validators.required,
                    Validators.maxLength(15)
                ]
            ],
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
                    Validators.maxLength(30),
                    this.passwordValidator()
                ]
            ]
        });
    }

    private passwordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value: string = control.value;

            if (!value) {
                return { required: true };
            }

            const errors: ValidationErrors = {};

            if (value.length < 8) {
                errors.minLength = true;
            }

            if (value.length > 30) {
                errors.maxLength = true;
            }

            if (!/(?=.*[A-Z])/.test(value)) {
                errors.uppercase = true;
            }

            if (!/(?=.*[a-z])/.test(value)) {
                errors.lowercase = true;
            }

            if (!/(?=.*\d)/.test(value)) {
                errors.numeric = true;
            }

            if (!/(?=.*[@$!%*?&])/.test(value)) {
                errors.special = true;
            }

            return Object.keys(errors).length === 0 ? null : errors;
        };
    }

    onSignup() {
        this.signupError = null;
        const { email, password } = this.registerForm.value;
        this.authService.userSignup({ email, password })
            .then(user => {
                const uid = user.user.uid;
                this.db.addUserRole(uid, 'peasant')
                    .then(() => {
                        console.log('peasant role created!');
                        this.router.navigate(['/traveller/home']);
                    })
                    .catch(err => {
                        console.error('Error setting user role:', err);
                    });
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    this.signupError = 'Email is already in use.';
                } else {
                    this.signupError = 'An unexpected error occurred. Please try again later.';
                }
            });
    }
}
