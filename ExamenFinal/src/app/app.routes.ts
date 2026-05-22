import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { List } from './pages/list/list';
import { Form } from './pages/form/form';
import { authGuard } from './guards/auth-guard';
import { SeeDetails } from './pages/see-details/see-details';


export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'landingPage'},
    {path:'landingPage',component:LandingPage },
    {path: 'login', component: Login},
    {
        path:'dashboard', component: Dashboard, canActivate: [authGuard], children:
        [
            {path:'', pathMatch: 'full', redirectTo: 'list'},
            {path:'list', component: List},
            {path:'form', component: Form},
            {path:'form/:id', component: Form},
            {path: 'seeDetails/:id', component: SeeDetails}
        ]
    },
    {path:'**', redirectTo: 'landingPage'},
];
