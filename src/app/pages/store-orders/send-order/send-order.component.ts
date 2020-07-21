import { Component, OnInit, Inject } from '@angular/core';
import { OrderModel } from '../../../models/entities/order.model';
import { StoreService } from 'src/app/services/store.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-send-order',
  templateUrl: './send-order.component.html',
  styleUrls: ['./send-order.component.css']
})
export class SendOrderComponent implements OnInit {

  order: OrderModel = new OrderModel();
  message: string = '';
  constructor(
    private storeService: StoreService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<SendOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.order = data;
  }

  ngOnInit(): void {
  }

  sendOrderSave() {
    let storeId = this.localStorageService.getInfoUserLogged().establishmentId;
    this.storeService.sendOrder(storeId, this.order.id).subscribe((res:any)=>{
      if (res.success) {
        this.dialogRef.close();
      }
      else {
        this.message = res.message
      }
    })

  }

}
