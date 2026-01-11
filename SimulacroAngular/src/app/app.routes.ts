import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Form } from './pages/form/form';
import { ProductList } from './pages/product-list/product-list';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: Home},
    {path: 'form', component: Form},
    {path: 'productList', component: ProductList},
    {path: '**', redirectTo: 'home'},
];
