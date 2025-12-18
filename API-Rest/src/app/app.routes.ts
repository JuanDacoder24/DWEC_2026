import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Form } from './pages/form/form';
import { SeeDetails } from './components/see-details/see-details';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: Home},
    {path: 'form', component: Form},
    {path: 'seeDetails', component: SeeDetails}
];
