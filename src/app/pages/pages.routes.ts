import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MapComponent } from './map/map.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { AuthService } from '../services/auth.service';
import { UsersComponent } from './users/users.component';
import { StoreOrdersComponent } from './store-orders/store-orders.component';
import { StoreProductsComponent } from './store-products/store-products.component';
import { HomeComponent } from './home/home.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { EditUserComponent } from './users/edit/edit.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'map', component: MapComponent, canActivate: [AuthService] },
            { path: 'customers', component: CustomersComponent, canActivate: [AuthService] },
            { path: 'store/:id', component: ProductsComponent, canActivate: [AuthService] },
            { path: 'my-orders', component: CustomerOrdersComponent, canActivate: [AuthService] },
            { path: 'my-orders-store', component: StoreOrdersComponent, canActivate: [AuthService] },
            { path: 'my-products', component: StoreProductsComponent, canActivate: [AuthService] },
            { path: 'edit/user', component: EditUserComponent, canActivate: [AuthService] },
            { path: 'change-password/user', component: ChangePasswordComponent, canActivate: [AuthService] },

            { path: 'register-user', component: UsersComponent },
            { path: 'home', component: HomeComponent },
            { path: 'upload-files', component: UploadFilesComponent },
            

            { path: '', redirectTo: '/home', pathMatch: 'full' },

        ]

    },
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);