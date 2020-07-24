import { Injectable } from '@angular/core';
import { StoreModel } from '../models/entities/store.models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  saveInfoStore(storeModel: StoreModel) {
    localStorage.removeItem('STORE_SELECTED')
    localStorage.setItem('STORE_SELECTED', JSON.stringify(storeModel));
  }

  getInfoStoreSelected() {
    return JSON.parse(localStorage.getItem('STORE_SELECTED'));
  }

  saveInfoUserLogged(customer: any) {
    localStorage.removeItem('USER_LOGGED')
    localStorage.setItem('USER_LOGGED', JSON.stringify(customer));
  }

  getInfoUserLogged() {
    return JSON.parse(localStorage.getItem('USER_LOGGED'));
  }

  userIsLogged() {
    let user = JSON.parse(localStorage.getItem('USER_LOGGED'));
    return user != undefined;
  }

  userTypeLogged() {
    let user = JSON.parse(localStorage.getItem('USER_LOGGED'));

    return user != undefined ? user.type : '';
  }

  AddProductInCard(val: boolean){
    localStorage.setItem('PRODUCT-IN-CARD', JSON.stringify(val));
  }

  HasProductInCard(){
    let hasproductsInCar= JSON.parse(localStorage.getItem('PRODUCT-IN-CARD'));
    return hasproductsInCar ;
  }

  removeProductInCard(){
    localStorage.removeItem('PRODUCT-IN-CARD');

  }

  loggout() {
    localStorage.removeItem('STORE_SELECTED');
    localStorage.removeItem('USER_LOGGED');
  }

}
