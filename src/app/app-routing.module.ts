import { NgModule } from '@angular/core';
import { AdminAuthGuard } from './gaurds/admin-auth.guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectLoggedInToBase = () => redirectLoggedInTo(['/traveller/home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/signin']);

const routes: Routes = [
    {
        path: 'signin',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectLoggedInToBase }
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'traveller',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
    { path: 'unauthorized', component: UnauthorizedComponent },

    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
