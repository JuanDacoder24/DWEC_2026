import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProducForm } from './pages/produc-form/produc-form';
import { ProductList } from './pages/product-list/product-list';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: Home},
    {path: 'produc-form', component: ProducForm},
    {path: 'product-list', component: ProductList},
    {path: '**', redirectTo: 'home'}
];
