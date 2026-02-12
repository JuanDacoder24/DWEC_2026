import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { List } from './pages/list/list';
import { Form } from './pages/form/form';
import { guardasGuard } from './guards/guardas-guard';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'landingPage'},
    {path:'landingPage',component:LandingPage },
    {path: 'login', component: Login},
    {
        path:'dashboard', component: Dashboard, canActivate:[guardasGuard], children:
        [
            {path:'', pathMatch: 'full', redirectTo: 'heroList'},
            {path:'heroList', component: List},
            {path:'heroform', component: Form},
            {path:'heroform/:id', component: Form}
        ]
    },
    {path:'**', redirectTo: 'landingPage'},
];
