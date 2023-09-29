import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { AdminBaseLayoutComponent } from './admin-base-layout/admin-base-layout.component';
import { ManageBusComponent } from './manage-bus/manage-bus.component';
import { BookingLogsComponent } from './booking-logs/booking-logs.component';

const routes: Routes = [
    {
        path: '',
        component: AdminBaseLayoutComponent,
        children: [
            { path: 'home', component: AdminHomeComponent },
            { path: 'manage', component: ManageBusComponent },
            { path: 'booking-logs', component: BookingLogsComponent },
            { path: '', redirectTo: '/admin/home', pathMatch: 'full' }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
