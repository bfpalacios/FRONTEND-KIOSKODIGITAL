import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ErrorMessagePipe } from '../pipes/error-message.pipe';
import { TruncatePipe } from '../pipes/truncate.pipe';

import { MatMomentDateModule } from '@angular/material-moment-adapter';


import { AgmCoreModule } from '@agm/core';

import { PagesComponent } from './pages.component';


import { PAGES_ROUTES } from './pages.routes';
import { MapComponent } from './map/map.component';
import { CustomersComponent } from './customers/customers.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HeaderComponent } from '../components/share/header/header.component';
import { FooterComponent } from '../components/share/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




import { ProductsComponent } from './products/products.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { DetailsComponent } from './customer-orders/details/details.component';
import { UsersComponent } from './users/users.component';
import { environment } from '../../environments/environment.prod';
import { StoreOrdersComponent } from './store-orders/store-orders.component';
import { StoreProductsComponent } from './store-products/store-products.component';
import { HomeComponent } from './home/home.component';
import { CancelComponent } from './customer-orders/cancel/cancel.component';
import { AddProductComponent } from './store-products/add-product/add-product.component';
import { AppDateAdapter, APP_DATE_FORMATS } from '../helpers/format-datepicker';
import { RejectOrderComponent } from './store-orders/reject-order/reject-order.component';
import { AceptOrderComponent } from './store-orders/acept-order/acept-order.component';
import { DeliverOrderComponent } from './store-orders/deliver-order/deliver-order.component';
import { SendOrderComponent } from './store-orders/send-order/send-order.component';
import { DetailsOrderComponent } from './store-orders/details-order/details-order.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { EditUserComponent } from './users/edit/edit.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { EditProductComponent } from './store-products/edit-product/edit-product.component';





@NgModule({
    declarations: [
        PagesComponent,
        ErrorMessagePipe,
        TruncatePipe,
        MapComponent,
        CustomersComponent,
        ProductsComponent,
        CustomerOrdersComponent,
        DetailsComponent,
        HeaderComponent,
        FooterComponent,
        UsersComponent,
        StoreOrdersComponent,
        StoreProductsComponent,
        HomeComponent,
        CancelComponent,
        AddProductComponent,
        RejectOrderComponent,
        AceptOrderComponent,
        DeliverOrderComponent,
        SendOrderComponent,
        DetailsOrderComponent,
        UploadFilesComponent,
        EditUserComponent,
        ChangePasswordComponent,
        EditProductComponent




    ],
    exports: [
        PagesComponent,
        MapComponent,
        CustomersComponent,
        HeaderComponent,
        FooterComponent


    ],
    imports: [
        BrowserModule,
        NgbModule,
        CommonModule,
        PAGES_ROUTES,
        AgmCoreModule.forRoot({
            apiKey: environment.API_KEY_GOOGLE
        }),
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatTreeModule,
        MatExpansionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatNativeDateModule,
        MatRippleModule,
        MatRadioModule,
        MatSnackBarModule,
        MatDialogModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatSlideToggleModule,


    ],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }

    ]
})

export class PageModule { }
