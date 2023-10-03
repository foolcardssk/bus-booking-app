import { Component, Input } from '@angular/core';
import { Bus } from 'src/app/models/bus-data.model';

@Component({
    selector: 'app-bus-list-item',
    templateUrl: './bus-list-item.component.html',
    styleUrls: ['./bus-list-item.component.css']
})
export class BusListItemComponent {
    viewSeats: boolean = false;
    @Input('bus-item') bus: Bus;
}
