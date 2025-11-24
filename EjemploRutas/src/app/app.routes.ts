import { Routes } from '@angular/router';
import { Contact } from './pages/contact/contact';
import { ServiciosProfesionales } from './pages/servicios-profesionales/servicios-profesionales';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {path: '', pathMatch:'full', redirectTo: 'home'},
    {path: 'home', component: Home},
    {path: 'contacto', component: Contact},
    {path: 'servicios', component: ServiciosProfesionales},
    {path: '**', redirectTo: 'home'}
];
