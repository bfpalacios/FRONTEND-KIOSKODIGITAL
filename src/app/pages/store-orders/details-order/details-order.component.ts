import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {

  order: any = {};
  message: string = '';
  constructor(
    public dialogRef: MatDialogRef<DetailsOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = data
   }

  ngOnInit(): void {
  }

}
