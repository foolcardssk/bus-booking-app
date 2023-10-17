import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { MaterialModule } from '../material/material.module';
import { BusSearchComponent } from './components/bus-search/bus-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { BusListItemComponent } from './components/bus-list-item/bus-list-item.component';
import { BusSeatsComponent } from './components/bus-seats/bus-seats.component';
import { BusSeatPriceComponent } from './components/bus-seat-price/bus-seat-price.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';


@NgModule({
    declarations: [
        UserHomeComponent,
        BusSearchComponent,
        BusListComponent,
        BusListItemComponent,
        BusSeatsComponent,
        BusSeatPriceComponent,
        PersonalDetailsComponent,
        BaseLayoutComponent,
        BookingSummaryComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class UserModule { }
