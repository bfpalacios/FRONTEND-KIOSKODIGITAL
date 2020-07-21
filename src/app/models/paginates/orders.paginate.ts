import { BasePaginate } from './base/base.paginate';
import { OrderModel } from '../entities/order.model';


export class OrdersPaginate extends BasePaginate {

    orders: OrderModel[] = [];

}