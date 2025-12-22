import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Form } from './pages/form/form';
import { SeeDetails } from './components/see-details/see-details';
import { Error404 } from './pages/error404/error404';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: Home},
    {path: 'form', component: Form},
    {path: 'form/:_id', component: Form},
    {path: 'seeDetails/:_id', component: SeeDetails},
    {path: 'error404', component: Error404},
    {path: '**', redirectTo: 'error404' }
];
