import { ProductModel } from '../entities/product.model';
import { BasePaginate } from './base/base.paginate';


export class ProductsPaginate extends BasePaginate {

    products: ProductModel[] = [];

    constructor() {
        super()

    }

}