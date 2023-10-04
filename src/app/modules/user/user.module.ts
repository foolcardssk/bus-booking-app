import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { MaterialModule } from '../material/material.module';
import { BusSearchComponent } from './bus-search/bus-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusListComponent } from './bus-list/bus-list.component';
import { BusListItemComponent } from './bus-list-item/bus-list-item.component';
import { BusSeatsComponent } from './bus-seats/bus-seats.component';
import { BusSeatPriceComponent } from './bus-seat-price/bus-seat-price.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';


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
