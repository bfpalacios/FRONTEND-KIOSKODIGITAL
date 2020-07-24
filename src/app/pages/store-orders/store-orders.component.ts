import { Component, OnInit } from '@angular/core';
import { OrderFilters } from '../../models/filters/order.filter';
import { statusDropDown } from '../../../mocks/orderStatus';
import { StoreService } from '../../services/store.service';
import { OrdersPaginate } from 'src/app/models/paginates/orders.paginate';
import { LocalStorageService } from '../../services/local-storage.service';
import { OrderModel } from '../../models/entities/order.model';
import { MatDialog } from '@angular/material/dialog';
import { RejectOrderComponent } from './reject-order/reject-order.component';
import { AceptOrderComponent } from './acept-order/acept-order.component';
import { DeliverOrderComponent } from './deliver-order/deliver-order.component';
import { SendOrderComponent } from './send-order/send-order.component';
import { DetailsOrderComponent } from './details-order/details-order.component';
import * as moment from 'moment';


@Component({
  selector: 'app-store-orders',
  templateUrl: './store-orders.component.html',
  styleUrls: ['./store-orders.component.css']
})
export class StoreOrdersComponent implements OnInit {

  query: OrderFilters = new OrderFilters();
  status: any[] = statusDropDown;
  orders: OrdersPaginate = new OrdersPaginate();

  constructor(
    private storeService: StoreService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.query.orderStartDate = moment().format();
    this.query.orderEndDate = moment().format();
  }

  search() {
    this.consumer();
  }

  consumer() {
    const query = {
      ...this.query,
      orderStartDate: moment(this.query.orderStartDate).format('YYYY-MM-DD'),
      orderEndDate: moment(this.query.orderEndDate).format('YYYY-MM-DD')
    };
    this.storeService.getOrdersByStore(this.localStorageService.getInfoUserLogged().establishmentId, query).subscribe((res: any) => {
      this.orders = res

      // this.query.orderStartDate = moment(this.query.orderStartDate).format('YYYY-MM-DD');
      // console.log(this.query.orderStartDate)
      // this.query.orderEndDate = moment(this.query.orderEndDate).format('YYYY-MM-DD');
      // console.log(this.query.orderEndDate)
    })
  }

  changeDateStartDate(date:Date){
    this.query.orderStartDate = moment(date).add(1,'day').format('YYYY-MM-DD');
  }

  changeDateEndtDate(date){
    this.query.orderEndDate = moment(date).format('YYYY-MM-DD');
  }

  paginate(event) {
    this.query.page = event.pageIndex;
    this.consumer();
  }

  cancelOrder(order: OrderModel) {
    let modal = this.dialog.open(RejectOrderComponent, {
      data: order
    })

    modal.afterClosed().subscribe(item => {
      this.consumer();
    })
  }

  aceptOrder(order: OrderModel) {
    let modal = this.dialog.open(AceptOrderComponent, {
      data: order
    })

    modal.afterClosed().subscribe(item => {
      this.consumer();
    })
  }

  deliverOrder(order: OrderModel) {
    let modal = this.dialog.open(DeliverOrderComponent, {
      data: order
    })

    modal.afterClosed().subscribe(item => {
      this.consumer();
    })
  }

  sendOrder(order: OrderModel) {
    let modal = this.dialog.open(SendOrderComponent, {
      data: order
    })

    modal.afterClosed().subscribe(item => {
      this.consumer();
    })
  }

  showDetails(order: OrderModel) {
    let modal = this.dialog.open(DetailsOrderComponent, {
      data: order
    })
  }


}
