import { Component } from '@angular/core';

@Component({
    selector: 'app-manage-bus',
    templateUrl: './manage-bus.component.html',
    styleUrls: ['./manage-bus.component.css']
})
export class ManageBusComponent {
    selectedTab: 'add-bus' | 'avail-buses' = 'avail-buses';

    selectTab(tab: 'add-bus' | 'avail-buses') {
        this.selectedTab = tab;
    }
}
