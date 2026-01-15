import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Form } from './pages/form/form';
import { ProductList } from './pages/product-list/product-list';
import { UserList } from './pages/user-list/user-list';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { SeeDetails } from './components/see-details/see-details';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: Home},
    {path: 'login', component: Login},

    {path: 'form/:_id', component: Form},
    {path: 'seeDetails/:_id', component: SeeDetails},
    {
        path: 'dashboard', component: Dashboard, children:
        [
            {path: '', pathMatch: 'full', redirectTo: 'productList'},
            {path: 'productList', component: ProductList},
            {path: 'userList', component: UserList},
            {path: 'form', component: Form},
        ]
    },
    {path: '**', redirectTo: 'home'},
];
