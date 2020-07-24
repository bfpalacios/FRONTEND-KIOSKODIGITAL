
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from './alert/alert.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  allMenu: any[] = [
    {
      title: 'Tiendas',
      path: '/map',
      type: 'CUSTOMER'
    },
    {
      title: 'Mis Pedidos',
      path: '/my-orders',
      type: 'CUSTOMER'
    },
    {
      title: 'Mis Pedidos',
      path: '/my-orders-store',
      type: 'PROVIDER'
    },
    {
      title: 'Mis Productos',
      path: '/my-products',
      type: 'PROVIDER'
    }

  ]
  isLogged: boolean = false;
  logo_customer: boolean = true

  customMenues: any[] = [];


  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private dialog: MatDialog
  ) {

    let user_type = this.localStorageService.userTypeLogged();
    this.customMenues = this.allMenu.filter(item => item.type == user_type);
    this.logo_customer = user_type === "CUSTOMER";
    this.isLogged = this.localStorageService.userIsLogged();

  }

  ngOnInit(): void {


  }

  loggout() {

    this.localStorageService.loggout();
    this.router.navigate(['/login'])
  }

  editProfile() {
    this.router.navigate(['/edit/user'])
  }

  changePassword() {
    this.router.navigate(['/change-password/user'])
  }

  changeMenu(menu: any) {
    if (menu.type == 'CUSTOMER') {
      let has_Products_in_car = this.localStorageService.HasProductInCard();
      if (has_Products_in_car) {
        let dialog = this.dialog.open(AlertComponent, { data: menu })
      } else {
        this.router.navigate([`${menu.path}`])
      }



    }else{
      this.router.navigate([`${menu.path}`])
    }
  }

}
