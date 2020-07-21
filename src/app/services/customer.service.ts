import { Injectable } from '@angular/core';
import { ProviderService } from './base/provider.service';
import { map } from 'rxjs/operators';
import { OrdersPaginate } from '../models/paginates/orders.paginate';
import { mapOrderToModel } from '../helpers/order.helper';
import { OrderCustomerFilters } from '../models/filters/order.customer.filter';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private providerService:
    ProviderService) {

  }

  getOrdersByUser(customerId: number, page: number, searchQuery: OrderCustomerFilters) {
    let api: string = searchQuery.status == '0' ?
      `customers/${customerId}/orders?page=${page}&size=30&sortBy=-creationDate` :
      `customers/${customerId}/orders?order-state=${searchQuery.status}&page=${page}&size=30&sortBy=-creationDate`
    return this.providerService.getQuery(api, searchQuery).pipe(map((x: any) => {
      return x != null ? mapOrderToModel(x.data.orders, page, x.data.total) : new OrdersPaginate;
    }));
  }

  exportExcel(orderId: number, user_type) {
    return this.providerService.getQuery(`common/order/${orderId}/excel`, { userType: user_type })
  }

  cancelOrder(orderId: number, customer: number) {
    return this.providerService.put(`customers/${customer}/order/${orderId}`, { state: "N", updateUser: customer });
  }

}
