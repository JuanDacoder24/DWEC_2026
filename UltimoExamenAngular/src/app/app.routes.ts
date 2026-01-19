import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuardsGuard } from './guards/auth-guards-guard';
import { HeroList } from './pages/hero-list/hero-list';
import { HeroForm } from './pages/hero-form/hero-form';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'landingPage'},
    {path:'landingPage',component:LandingPage },
    {path: 'login', component: Login},
    {
        path:'dashboard', component: Dashboard, canActivate:[authGuardsGuard], children:
        [
            {path:'', pathMatch: 'full', redirectTo: 'heroList'},
            {path:'heroList', component: HeroList},
            {path:'heroform', component: HeroForm},
            {path:'heroform/:id', component: HeroForm}
        ]
    },
    {path:'**', redirectTo: 'landingPage'},
];
