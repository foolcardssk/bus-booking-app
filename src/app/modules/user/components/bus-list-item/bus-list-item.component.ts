import { Component, Input } from '@angular/core';
import { Bus } from 'src/app/models/bus-data.model';

@Component({
    selector: 'app-bus-list-item',
    templateUrl: './bus-list-item.component.html',
    styleUrls: ['./bus-list-item.component.css']
})
export class BusListItemComponent {

    @Input('bus-item') bus: Bus;
    @Input('track-index') index: number;

    viewSeats: boolean = false;
}
