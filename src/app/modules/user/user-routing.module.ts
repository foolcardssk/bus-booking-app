import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: 'home', component: UserHomeComponent },
      { path: 'details', component: PersonalDetailsComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
