import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderModel } from '../../../models/entities/order.model';
import { CustomerService } from '../../../services/customer.service';
import { LocalStorageService } from '../../../services/local-storage.service';


@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {

  order: OrderModel = new OrderModel();
  constructor(
    private customerService:CustomerService,
    private localStorageService:LocalStorageService,
    public dialogRef: MatDialogRef<CancelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.order = this.data;
  }

  ngOnInit(): void {
  }

  cancelOrder(){
    

    this.customerService.cancelOrder(this.data.id,this.localStorageService.getInfoUserLogged().customerId).subscribe((res:any)=>{
      this.dialogRef.close();
    })
  }

}
