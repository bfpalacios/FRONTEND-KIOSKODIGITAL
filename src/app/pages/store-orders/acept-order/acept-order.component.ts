import { Component, OnInit, Inject } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-acept-order',
  templateUrl: './acept-order.component.html',
  styleUrls: ['./acept-order.component.css']
})
export class AceptOrderComponent implements OnInit {

  order: any = {};
  message: string = '';
  constructor(
    private storeService: StoreService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<AceptOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = data
  }

  ngOnInit(): void {
  }

  aceptedOrder() {
    let storeId = this.localStorageService.getInfoUserLogged().establishmentId;

    let details: any[] = [];

    this.order.items.forEach(element => {
      details.push({
        orderDetailId: element.orderDetailId,
        state: element.exist ? 'A' : 'N'
      })
    });
    let body = {
      state: 'A',
      stateOrderDetailList: details,
      updateUser: storeId
    }

    this.storeService.aceptOrder(storeId, this.order.id, body).subscribe((res:any)=>{
      if (res.success) {
        this.dialogRef.close();
      }
      else {
        this.message = res.message
      }
    })

  }

}
