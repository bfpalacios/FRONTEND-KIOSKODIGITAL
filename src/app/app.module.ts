import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';


import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { APP_ROUTES } from './app.routes';
import { PageModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { AlertComponent } from './components/share/header/alert/alert.component';




@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    NopagefoundComponent,
    ForgetPasswordComponent,
    AlertComponent,
    
    


  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    APP_ROUTES,
    PageModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    NgbModule

  ],
  providers: [],
  exports:[
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
