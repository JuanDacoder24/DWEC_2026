import { Routes } from '@angular/router';
import { Form } from './pages/form/form';
import { Home } from './pages/home/home';
import { ListProducts } from './pages/list-products/list-products';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: Home},
    {path: 'form', component: Form},
    {path: 'listProducts', component: ListProducts},
    {path: '**', redirectTo: 'home'}

];
