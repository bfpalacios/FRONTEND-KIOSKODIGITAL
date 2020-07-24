import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { OrdersPaginate } from '../../models/paginates/orders.paginate';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from './details/details.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { OrderModel } from '../../models/entities/order.model';
import { CancelComponent } from './cancel/cancel.component';
import { statusDropDown } from 'src/mocks/orderStatus';
import { OrderCustomerFilters } from 'src/app/models/filters/order.customer.filter';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  query: OrderCustomerFilters = new OrderCustomerFilters();
  status: any[] = statusDropDown;

  establecimientoFilter: string = null;
  dateFilter: string = null;
  deliveryTypeFilter: string = null;


  orders: OrdersPaginate = new OrdersPaginate();
  constructor(
    private customerService: CustomerService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.customerService.getOrdersByUser(this.localStorageService.getInfoUserLogged().customerId, 0,this.query).subscribe((res: OrdersPaginate) => {
      this.orders = res;
    })
  }

  openDialog(item: any): void {
    let dialogRef = this.dialog.open(DetailsComponent, {
      data: item
    });



  }

  cancelOrder(item: any): void {
    let dialog = this.dialog.open(CancelComponent, {
      data: item
    })

    dialog.afterClosed().subscribe(item => {
      this.customerService.getOrdersByUser(this.localStorageService.getInfoUserLogged().customerId, 0,this.query).subscribe((res: OrdersPaginate) => {
        this.orders = res;
      })
    })
  }



  downloadExcel(item: OrderModel) {
    this.customerService.exportExcel(item.id, 'Customer').subscribe((res: any) => {
      window.open(`${res.data.file.fileDownloadUri}`, '_blank')
    })

  }

  paginate(event) {
    this.customerService.getOrdersByUser(this.localStorageService.getInfoUserLogged().customerId, event.pageIndex,this.query).subscribe((res: OrdersPaginate) => {
      this.orders = res;
    })
  }

  changestatus(status: any) {
    this.query.status = status;
    this.customerService.getOrdersByUser(this.localStorageService.getInfoUserLogged().customerId, 0,this.query).subscribe((res: OrdersPaginate) => {
      this.orders = res;
      this.dateFilter = null;
      this.establecimientoFilter = null;
      this.deliveryTypeFilter = null;
    });
  }

  filterEstablecimiento(val: string) {
    this.query.status = val;
    this.customerService.getOrdersByUser(this.localStorageService.getInfoUserLogged().customerId, 0,this.query).subscribe((res: OrdersPaginate) => {
      this.orders = res;
      this.dateFilter = null;
      this.deliveryTypeFilter = null;
    });

  }

  filterDate() {
    this.query.status = moment(this.dateFilter).format('DD-MM-YYYY');
    this.customerService.getOrdersByUser(this.localStorageService.getInfoUserLogged().customerId, 0,this.query).subscribe((res: OrdersPaginate) => {
      this.orders = res;
      this.deliveryTypeFilter = null;
    });
    if (this.establecimientoFilter !== null) {
      this.dateFilter = null;
    }

    if (this.dateFilter !== null) {
      this.establecimientoFilter = null;
    }
  }

  filterDeliveryType(typeDel: string) {
    this.query.status = typeDel === 'R' ? 'Recojo en tienda' : 'envio';
    this.customerService.getOrdersByUser(this.localStorageService.getInfoUserLogged().customerId, 0,this.query).subscribe((res: OrdersPaginate) => {
      this.orders = res;
      this.dateFilter = null;
      this.establecimientoFilter = null;
    });
  }

}
