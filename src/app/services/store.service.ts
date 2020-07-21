import { Injectable } from '@angular/core';
import { ProviderService } from './base/provider.service';
import { map } from 'rxjs/operators';
import { parseResponseToProducts , mapClassesSearch , mapCategoriesSearch , mapSubCategoriesSearch , mapSubSubCategoriesSearch  } from '../helpers/product.helper';
import { parseResponseToStore } from '../helpers/store.helper'
import { ProductsPaginate } from '../models/paginates/products.paginate';
import { OrderFilters } from '../models/filters/order.filter';
import { mapOrderToModel } from '../helpers/order.helper';
import { OrdersPaginate } from '../models/paginates/orders.paginate';
import * as moment from 'moment';
import { SearchTreeProducts } from '../models/entities/searchTreeProducts.model';
import mapTreeproducts from '../helpers/searchTreeProducts.helper';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private providerService: ProviderService) { }

  getClassByStore(storeId: number) {
    return this.providerService.getQuery(`establishments/${storeId}/classes`, { sortBy: "id" }).pipe(map((x: any) => {
      return x = ! null ? mapClassesSearch(x.data.classes) : [];
     }))
  }

  getCategoriesByStoreAndClass(storeId: number, classId: number) {
    return this.providerService.getQuery(`establishments/${storeId}/classes/${classId}/categories`, { sortBy: "id" }).pipe(map((x: any) =>{
      return x != null ? mapCategoriesSearch( x.data.categories):[];
    }));
  }

  getSubCategoriesByStoreAndCategory(storeId: number, categoryId: number) {
    return this.providerService.getQuery(`establishments/${storeId}/category/${categoryId}/subcategories`).pipe(map((x: any) =>{
      return x !=null ? mapSubCategoriesSearch(x.data.subCategories):[];
    } ));
  }

  getProductsByStoreAndSubCategory(storeId: number, subCategoryId: number) {
    return this.providerService.getQuery(`establishments/${storeId}/subcategory/${subCategoryId}/subsubcategories-or-products`).pipe(map((x: any) => {

      if(x.data.storeProducts != undefined ){
        return x != null ? parseResponseToProducts(x.data.storeProducts, 0, x.data.productsTotal ?? x.data.total) : new ProductsPaginate();
      }else{
        console.log(x.data)
        return x != null ? mapSubSubCategoriesSearch(x.data.subSubCategories) : [];
      }
      
    }))
  }

  getProductsByStoreAndSubSubCategory(storeId: number, subsubCategoryId: number) {
    return this.providerService.getQuery(`establishments/${storeId}/subsubcategory/${subsubCategoryId}/products`).pipe(map((x: any) => {
      return x != null ? parseResponseToProducts(x.data.storeProducts, 0, x.data.productsTotal ?? x.data.total) : new ProductsPaginate();
    }))
  }



  getAllStoresByType(typeStore: number, lat: number, long: number) {

    return this.providerService.getQuery(`establishments`, { 'establishment-type': typeStore, 'latitude': lat, 'longitude': long, 'radius': 1000 }).pipe(map((x: any) => {
      return x != null ? parseResponseToStore(x.data.establishments, typeStore) : [];
    }))
  }


  saveOrder(customerId: number, body: any) {
    return this.providerService.post(`customers/${customerId}/order`, body)
  }

  addProductStore(productId: number, price: number, storeId: number) {
    return this.providerService.post(`establishments/${storeId}/products`, {
      products: [{
        price: price,
        productTemplateId: productId
      }]
    });
  }

  getOrdersByStore(storeId: number, param: OrderFilters) {

    param.orderStartDate = moment(param.orderStartDate).format('YYYY-MM-DD');
    param.orderEndDate = moment(param.orderEndDate).format('YYYY-MM-DD');
    if (Number(param.status) != 0) {
      param['order-state'] = param.status;
    } else {
      delete param['order-state'];
    }


    return this.providerService.getQuery(`establishments/${storeId}/orders`, param).pipe(map((x: any) => {
      return x != null ? mapOrderToModel(x.data.orders, param.page, x.data.total) : new OrdersPaginate;
    }));
  }

  cancelOrder(storeId: number, orderId: number) {
    return this.providerService.put(`establishments/${storeId}/order/${orderId}`, {
      state: "N",
      updateUser: storeId
    })
  }

  aceptOrder(storeid: number, orderId: number, body: any) {
    return this.providerService.put(`establishments/${storeid}/order/${orderId}`, body)
  }

  deliverOrder(storeId: number, orderId: number) {
    return this.providerService.put(`establishments/${storeId}/order/${orderId}`, {
      state: "T",
      updateUser: storeId
    })
  }

  sendOrder(storeId: number, orderId: number) {
    return this.providerService.put(`establishments/${storeId}/order/${orderId}`, {
      state: "E",
      updateUser: storeId
    })
  }

  getTreeStoreProduct(storeId: number) {
    return this.providerService.getQuery(`establishments/${storeId}/treestoreproducts`).pipe(map((x: any) => {
      return x != null ? mapTreeproducts(x.data.tree) : new SearchTreeProducts();
    }));



  }




}
