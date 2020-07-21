import { Injectable } from '@angular/core';
import { ProviderService } from './base/provider.service';
import { parseResponseToProducts, parseResponseToProductWithOutPaginate } from '../helpers/product.helper';
import { map } from 'rxjs/operators';
import { ProductsPaginate } from '../models/paginates/products.paginate';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private providerService: ProviderService
  ) { }

  getProductsByStore(storeId: number, text: string, page: number) {
    return this.providerService.getQuery(`establishments/${storeId}/products?page=${page}&size=21&text=${text}`).pipe(map((x: any) => {
      return x != null ? parseResponseToProducts(x.data.storeProducts, page, x.data.total) : new ProductsPaginate();
    }))
  }

  getProducts(criteria: string) {
    return this.providerService.getQuery(`products`, { text: criteria }).pipe(map((x: any) => {
      return x != null ? parseResponseToProductWithOutPaginate(x.data.products) : [];
    }))
  }

  updateProduct(store: any, storeproduct: any, price: number, stock: string) {

    return this.providerService.put(`establishments/${store}/storeproduct/${storeproduct}`, { price, stock });

  }

}
