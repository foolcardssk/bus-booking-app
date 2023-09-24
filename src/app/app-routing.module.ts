import { map } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo, hasCustomClaim } from '@angular/fire/compat/auth-guard';

const adminOnly = () => map(() => {
  hasCustomClaim('admin') ? true : redirectUnauthorizedToLogin
});
const redirectLoggedInToItems = () => redirectLoggedInTo(['/traveller']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/signin']);

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems }
  },
  {
    path: 'traveller',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
