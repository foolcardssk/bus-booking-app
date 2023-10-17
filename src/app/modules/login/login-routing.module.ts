import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBaseComponent } from './components/login-base/login-base.component';
import { PageNotFoundComponent } from 'src/app/shared/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', component: LoginBaseComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
