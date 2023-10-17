import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { PageNotFoundComponent } from 'src/app/shared/page-not-found/page-not-found.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';

const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            { path: 'home', component: UserHomeComponent },
            { path: 'details', component: PersonalDetailsComponent },
            { path: 'booking-summary', component: BookingSummaryComponent },
            { path: '', redirectTo: '/traveller/home', pathMatch: 'full' }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
