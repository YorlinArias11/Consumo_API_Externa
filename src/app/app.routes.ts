import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'producto',
        component: ProductoComponent,
        canActivate: [authGuard],
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'producto'
    }
];
