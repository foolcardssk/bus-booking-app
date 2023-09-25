import { Component } from '@angular/core';

@Component({
  selector: 'app-bus-list-item',
  templateUrl: './bus-list-item.component.html',
  styleUrls: ['./bus-list-item.component.css']
})
export class BusListItemComponent {
  viewSeats: boolean = false;
}
