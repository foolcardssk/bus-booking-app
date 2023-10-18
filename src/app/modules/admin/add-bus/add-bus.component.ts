import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BusManageService } from 'src/app/services/bus-manage.service';


@Component({
    selector: 'app-add-bus',
    templateUrl: './add-bus.component.html',
    styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {

    model: string = 'L:18S-5SL U:0S-15SL';

    private fb = inject(FormBuilder);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar)
    private busManageService = inject(BusManageService);

    busForm: FormGroup<{
        source: FormControl<string>;
        destination: FormControl<string>;
        busName: FormControl<string>;
        departureTime: FormControl<string>;
        arrivalTime: FormControl<string>;
    }>;

    ngOnInit(): void {
        this.busForm = this.fb.group({
            source: ['',
                [
                    Validators.required,
                    Validators.maxLength(30),
                    Validators.pattern(/^[A-Za-z\s,]+$/)
                ]
            ],
            destination: ['',
                [
                    Validators.required,
                    Validators.maxLength(30),
                    Validators.pattern(/^[A-Za-z\s,]+$/)
                ]
            ],
            busName: ['',
                [
                    Validators.required,
                    Validators.maxLength(30),
                    Validators.pattern(/^[A-Za-z\s]+$/)
                ]
            ],
            departureTime: ['',
                [
                    Validators.required,
                    Validators.pattern(/^([0-9]|0[0-9]|1[0-2]):[0-5][0-9]\s(?:AM|PM)$/i)
                ]

            ],
            arrivalTime: ['',
                [
                    Validators.required,
                    Validators.pattern(/^([0-9]|0[0-9]|1[0-2]):[0-5][0-9]\s(?:AM|PM)$/i)
                ]
            ]
        });
    }

    onSubmit() {
        const { source, destination, busName, departureTime, arrivalTime } = this.busForm.value;

        this.busManageService.createNewBus(source, destination, busName, this.model, departureTime, arrivalTime);
        this.busForm.reset();
        this.showSnackBar('New Bus Added. Redirecting...');
        this.router.navigate(['/admin/home']);
    }

    showSnackBar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 2000,
        });
    }
}
