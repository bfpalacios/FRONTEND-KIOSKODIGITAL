import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import { MatSnackBar } from '@angular/material/snack-bar';



import { ProductModel } from '../../models/entities/product.model';
import * as _ from 'lodash';

import { StoreService } from '../../services/store.service';
import { SearchTreeProducts } from 'src/app/models/entities/searchTreeProducts.model';
import { Class, SubCategory, Category, SubSubCategory } from '../../models/entities/searchTreeProducts.model';
import { mapOrderToSave } from '../../helpers/order.helper';
import { ProductsService } from '../../services/products.service';
import { ProductsPaginate } from '../../models/paginates/products.paginate';
import { StoreModel } from 'src/app/models/entities/store.models';
import { LocalStorageService } from '../../services/local-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  paginate: ProductsPaginate = new ProductsPaginate();
  criteria: string = '';
  productsInCar: ProductModel[] = [];
  total: number = 0.00;
  searchTreeProducts: SearchTreeProducts = new SearchTreeProducts();
  userLogged: any = {};
  storeSelected: StoreModel;
  shedulesDelivery: any[] = [];
  serviceType: any = "R";
  dateDelivery: Date = new Date();
  minDate: Date;
  maxDate: Date;

  listclass:any[] = [];
  listcategories:any[] = [];
  listSubCategories:any[]=[];
  listSubSubCategories:any[]=[];


  hourDelivery: number;

  constructor(

    private storeService: StoreService,
    private productsService: ProductsService,
    private router: ActivatedRoute,
    private routernavigate: Router,
    private animateScrollService: NgAnimateScrollService,
    private localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar) {
    this.loadProductsDefaut();
    this.loadStoreSelected();

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDay = moment().date()

    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.maxDate = new Date(currentYear, currentMonth, currentDay + 2);
  }

  ngOnInit(): void {
    // this.storeService.getTreeStoreProduct(this.storeSelected.id).subscribe((res:Class[]) => {
    //   this.searchTreeProducts.classes = res;
    // });

    this.storeService.getClassByStore(this.storeSelected.id).subscribe((res:any)=>{
      this.listclass = res;
      
    })

  }

  loadCategoriesByClassAndStore(itemClass:any){
    this.listclass.forEach((item)=>    item.isSelected = item == itemClass);

    
    this.listSubCategories = [];
    this.listSubSubCategories=[];
    this.storeService.getCategoriesByStoreAndClass(this.storeSelected.id,itemClass.id).subscribe((res:any)=>{
      this.listcategories = res;
    })
  }

  loadSCategoriesBycategoryAndStore(itemCategory:any){
    this.listcategories.forEach((item)=>    item.isSelected = item == itemCategory);
    this.listSubSubCategories=[];
    this.storeService.getSubCategoriesByStoreAndCategory(this.storeSelected.id,itemCategory.id).subscribe((res:any)=>{
      this.listSubCategories = res;
    })
  }


  loadProductsDefaut() {
    this.router.params.subscribe(parms => {
      this.searchProducts(parms['id'], '', 0);
    })

  }

  loadStoreSelected() {
    this.storeSelected = this.localStorageService.getInfoStoreSelected();

  }

  search() {

    this.router.params.subscribe(parms => {
      this.searchProducts(parms['id'], this.criteria, 0);
    })

  }

  searchProducts(store: number, criteria: string, page: number) {
    this.productsService.getProductsByStore(store, criteria, page).subscribe((res: ProductsPaginate) => {
      this.paginate = res
    })
  }

  searchPaginate(page: number) {
    this.router.params.subscribe(parms => {
      this.searchProducts(parms['id'], this.criteria, page);
      this.animateScrollService.scrollToElement('content-page', 1000)
    })
  }

  
  loadProducts(item: any) {
    this.listSubCategories.forEach((a)=>    a.isSelected = a == item)
    this.listSubSubCategories= [];
    this.router.params.subscribe(parms => {
      this.storeService.getProductsByStoreAndSubCategory(parms['id'], item.id).subscribe((res: any) => {
        if( res instanceof ProductsPaginate){
          this.paginate = res
        }else{
          this.listSubSubCategories = res;
        }
       
      })
    })

  }

  loadProductSubSubCategories(item: any){
    this.listSubSubCategories.forEach((a)=>    a.isSelected = a == item)

    this.router.params.subscribe(parms => {
      this.storeService.getProductsByStoreAndSubSubCategory(parms['id'], item.id).subscribe((res: ProductsPaginate) => {
        this.paginate = res;
      })
    })
  }

  addquantity(item: ProductModel) {
    if (item.measurementUnit === "kg") {
      item.quantity = item.quantity + 0.10;
      item.quantity = Number(item.quantity.toFixed(2))
    } else {
      item.quantity = item.quantity + 1;
    }
    item.total = item.quantity * item.price;

  }

  removequantity(item: ProductModel) {

    if (item.measurementUnit === "kg") {
      if (item.quantity > 0.10) {
        item.quantity = Number(item.quantity) - 0.1
        item.total = Number(item.quantity) * Number(item.price);
        item.quantity = Number(item.quantity.toFixed(2))
      }

    } else {
      if (item.quantity > 1) {

        item.quantity = Number(item.quantity) - 1
        item.total = item.total * item.price;
      }
    }


  }

  addShoppingCart(item: ProductModel) {
    let newproduct: ProductModel = _.clone(item)
    let exist = _.find(this.productsInCar, (x) => { return x.productId === item.productId });
    if (exist === undefined) {
      this.productsInCar.push(newproduct);
    } else {
      this.productsInCar.forEach((product: ProductModel) => {
        if (product.productId === item.productId) {
          product.quantity = product.quantity + newproduct.quantity;
          product.total = Number(product.total) + Number(newproduct.total);
        }
      })
    }
    this.total = _.sum(this.productsInCar.map(item => item.total));
    if (item.measurementUnit === "kg") {
      item.quantity = 0.10;
    } else {
      item.quantity = 1;
    }
    this._snackBar.open('El producto ha sido agregado del carrito', 'cerrar', { duration: 2000 });
    this.localStorageService.AddProductInCard();
    
  }

  removeShoppingCart(item: ProductModel, index: number) {
    this.productsInCar.splice(index, 1);
    this.total = _.sum(this.productsInCar.map(item => item.total));
    this._snackBar.open('Producto ha sido agregado al Carrito', 'cerrar', { duration: 2000 });


  }

  saveOrder() {
    if (this.serviceType == "E" && (this.hourDelivery == undefined || this.hourDelivery == null)) {
      this._snackBar.open('El horario de Delivery es Obligatorio', 'cerrar', { duration: 2000 });
    } else {
      let usserLogged = this.localStorageService.getInfoUserLogged();
      let body = mapOrderToSave(this.productsInCar,
        this.serviceType, this.dateDelivery.toString(),
        this.storeSelected,
        this.hourDelivery,
        usserLogged,
      );
      this.storeService.saveOrder(usserLogged.customerId, body).subscribe((res: any) => {
        if (res.success) {
          this._snackBar.open('Su compra ha sido realizada con éxito', 'cerrar', { duration: 2000 });
          this.productsInCar = [];
          this.routernavigate.navigate(['/my-orders']);
        }
      })
    }

  }
  changedeliveryType(){
    if(this.serviceType == 'E'){
      let date = moment(this.dateDelivery).format('YYYY-MM-DD')
      if (moment(date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
        let current_hour = moment().hour();
        this.storeSelected.shippingSchedule.forEach((item: any) => {
          let endDate = item.endTime.split(":").map(Number);
          let endDateHour = endDate[0];
          if (endDateHour > current_hour) {
            this.shedulesDelivery.push(item);
          }
  
        })
  
  
  
      } else {
        this.shedulesDelivery = this.storeSelected.shippingSchedule;
      }
    }
  }
  changeDate(date: any) {
    this.shedulesDelivery = [];
    if(this.serviceType == 'E')
    if (moment(date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
      let current_hour = moment().hour();
      this.storeSelected.shippingSchedule.forEach((item: any) => {
        let endDate = item.endTime.split(":").map(Number);
        let endDateHour = endDate[0];
        if (endDateHour > current_hour) {
          this.shedulesDelivery.push(item);
        }

      })



    } else {
      this.shedulesDelivery = this.storeSelected.shippingSchedule;
    }

  }

}
