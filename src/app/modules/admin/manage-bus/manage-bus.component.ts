import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusManageService } from 'src/app/services/bus-manage.service';

@Component({
    selector: 'app-manage-bus',
    templateUrl: './manage-bus.component.html',
    styleUrls: ['./manage-bus.component.css']
})
export class ManageBusComponent implements OnInit, OnDestroy {
    busForm: FormGroup;

    constructor(private fb: FormBuilder, private busManageService: BusManageService) { }

    ngOnInit(): void {
        this.busForm = this.fb.group({
            source: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s,]+$/)]],
            destination: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s,]+$/)]],
            busName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
        });
    }

    onSubmit() {
        if (this.busForm.valid) {
            const source = this.busForm.get('source').value;
            const destination = this.busForm.get('destination').value;
            const busName = this.busForm.get('busName').value;
            this.busManageService.createNewBus(source, destination, busName, 'L:18S-5SL U:0S-15SL');
            this.busForm.reset();
            console.log('Form Submitted');
        } else {
            console.log('Not Valid Form');
        }
    }

    ngOnDestroy(): void {

    }
}
