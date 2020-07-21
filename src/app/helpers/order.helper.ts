import { ProductModel } from 'src/app/models/entities/product.model';
import { StoreModel } from '../models/entities/store.models';
import * as _ from 'lodash';
import * as moment from 'moment';
import { OrdersPaginate } from '../models/paginates/orders.paginate';
import { OrderModel } from '../models/entities/order.model';
import { getDeliveryTypeName } from './deliveryType.helper';
import { mapOrderState } from './status.helper';
import { environment } from 'src/environments/environment';

export function mapOrderToSave(products: ProductModel[],
    deliveryType: string,
    dateDelivery: string,
    storeSelected: StoreModel,
    hourDelivery: number,
    userLogged: any) {

    let order: any = {};
    let details: any[] = []

    products.forEach((item) => {
        details.push({
            observation: "...",
            price: item.price,
            quantity: item.quantity,
            storeProductId: item.productId,
            subtotal: item.total,
            unitMeasure: item.measurementUnit
        })
    })

    let shippingSchedule = deliveryType == 'E' ? storeSelected.shippingSchedule[hourDelivery] : null;



    order.creationUser = userLogged.customerId;
    order.deliveryType = deliveryType;
    order.establishmentId = storeSelected.id;
    order.orderDetailRequest = details;
    order.shippingDateFrom = deliveryType == 'E' ? moment(dateDelivery).add(shippingSchedule.startTime.split(':')[0], 'hours').format('YYYY-MM-DDTHH:mm:ss') : '';
    order.shippingDateUntil = deliveryType == 'E' ? moment(dateDelivery).add(shippingSchedule.endTime.split(':')[0], 'hours').format('YYYY-MM-DDTHH:mm:ss') : '';
    
    order.total = _.sum(products.map(item => item.total));

    return order;




}

export function mapOrderToModel(response: any[], currentPage: number, total: number): OrdersPaginate {
    let paginate: OrdersPaginate = new OrdersPaginate();
    let orders: OrderModel[] = [];

    response.forEach((item) => {
        let order: OrderModel = new OrderModel();
        let products: any[] = [];
        let status = mapOrderState(item.status)

        order.id = item.orderId;
        order.ownerName = `${item.establishment.lastNamePaternal} ${item.establishment.lastNameMaternal} ${item.establishment.name} `;
        order.customerName = `${item.customer.lastNamePaternal} ${item.customer.lastNameMaternal} ${item.customer.name} `;
        order.storeName = item.establishment.businessName;
        order.phone = item.establishment.phoneNumber;
        order.customerPhone = item.customer.phoneNumber;
        order.customerAdress = item.customer.address == undefined ? '' : item.customer.address;
        order.deliveryTypeId = item.deliveryType;
        order.deliveryTypeName = getDeliveryTypeName(item.deliveryType);
        order.statusColor = status.color;
        order.statusName = status.name;
        order.statusbadge = status.value;
        order.statusId = item.status
        order.deliveryDateFrom = moment(item.shippingDateFrom).format('YYYY-MM-DD HH:mm:ss');
        order.deliveryDateTo = moment(item.shippingDateUntil).format('YYYY-MM-DD HH:mm:ss');
        order.total = item.total;
        order.orderDate = moment(item.creationDate).format('YYYY-MM-DD HH:mm:ss')

        item.orderDetail.forEach((product) => {
            products.push({
                
                productid: product.storeProduct.productTemplate.productTemplateId,
                productname: product.storeProduct.productTemplate.description,
                quantity: product.quantity,
                measurementUnit: product.unitMeasure,
                total: product.subTotal,
                price: product.price,
                orderDetailId:product.orderDetailId,
                exist:true,
                productPath: product.storeProduct.productTemplate.pathImage == "NULL" ? './assets/img/img_not_found.jpg' : product.storeProduct.productTemplate.pathImage
            })
        })
        order.items = products;

        orders.push(order);

    })
    paginate.orders = orders;
    paginate.currentPage = currentPage;
    paginate.numberPages = Math.ceil(total / 30);
    paginate.numberPagesList = Array.from(Array(paginate.numberPages).keys())
    paginate.totalRows = total;
    paginate.itemsPerPage = 30;

    return paginate;
}