import { ProductModel } from './product.model';

export class OrderModel {

    id: number;
    storeName: string;
    path_file_xls: string;
    total: number;
    deliveryTypeId: string;
    deliveryTypeName: string;
    statusName: string;
    statusColor: string;
    statusbadge: string;
    statusId: string;
    ownerName: string;
    phone: string;
    deliveryDateFrom: string;
    deliveryDateTo: string;
    customerName: string;
    customerAdress: string;
    customerPhone: string;
    exist:boolean = true;
    orderDate:string;
    

    items: ProductModel[] = [];


}