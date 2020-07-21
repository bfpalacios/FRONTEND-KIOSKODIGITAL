import { Component, OnInit, Inject } from '@angular/core';
import { OrderModel } from '../../../models/entities/order.model';
import { StoreService } from 'src/app/services/store.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deliver-order',
  templateUrl: './deliver-order.component.html',
  styleUrls: ['./deliver-order.component.css']
})
export class DeliverOrderComponent implements OnInit {

  message: string = '';
  order: OrderModel = new OrderModel();

  constructor(
    private storeService: StoreService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<DeliverOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = data;
  }

  ngOnInit(): void {
  }

  deliverOrderSave() {
    let storeId = this.localStorageService.getInfoUserLogged().establishmentId;
    this.storeService.deliverOrder(storeId, this.order.id).subscribe((res:any)=>{
      if (res.success) {
        this.dialogRef.close();
      }
      else {
        this.message = res.message
      }
    })

  }

}
