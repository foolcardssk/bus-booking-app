import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MaterialModule } from '../material/material.module';
import { AdminBaseLayoutComponent } from './admin-base-layout/admin-base-layout.component';
import { ManageBusComponent } from './manage-bus/manage-bus.component';
import { BookingLogsComponent } from './booking-logs/booking-logs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        AdminHomeComponent,
        AdminBaseLayoutComponent,
        ManageBusComponent,
        BookingLogsComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class AdminModule { }
