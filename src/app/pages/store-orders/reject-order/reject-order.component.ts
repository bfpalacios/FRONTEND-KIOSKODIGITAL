import { Component, OnInit, Inject } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderModel } from '../../../models/entities/order.model';

@Component({
  selector: 'app-reject-order',
  templateUrl: './reject-order.component.html',
  styleUrls: ['./reject-order.component.css']
})
export class RejectOrderComponent implements OnInit {

  order: OrderModel = new OrderModel();
  message: string = '';

  constructor(
    private storeService: StoreService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<RejectOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.order = data;
  }

  ngOnInit(): void {
  }

  cancelOrder() {
    this.storeService.cancelOrder(this.localStorageService.getInfoUserLogged().establishmentId, this.order.id).subscribe((res: any) => {
      if (res.success) {
        this.dialogRef.close();
      }
      else {
        this.message = res.message
      }

    })

  }
}
