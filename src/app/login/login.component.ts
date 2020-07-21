import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/entities/login.model';
import { LoginService } from '../services/login.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: LoginModel = new LoginModel();
  message = ''

  constructor(
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/register-user/']);
  }

  login() {
    this.message = '';
    this.loginService.login(this.formLogin).subscribe((res: any) => {
      
      if (!res.success ) {
        this.message = res.message
      } else {
        if (res.data.customer != undefined) {
          let user = res.data.customer;
          user.type = environment.CUSTOMER;
          this.localStorageService.saveInfoUserLogged(user);
          this.router.navigate(['/map/']);
        } else {
          let user = res.data.establishment;
          user.type = environment.PROVIDER;
          this.localStorageService.saveInfoUserLogged(user);
          this.router.navigate(['/my-orders-store/']);
        }
      }

    }, (err) => {
      
      if (err.status == 400) {
        this.message = `*${err.error.message}`;
      }
    })
  }

  forgetPassword(){
    let dialog = this.dialog.open(ForgetPasswordComponent, {})
  }

}
