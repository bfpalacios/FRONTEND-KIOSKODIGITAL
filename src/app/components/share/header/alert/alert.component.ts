import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  menu: any;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    public dialogRef: MatDialogRef<AlertComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.menu = data;
  }

  ngOnInit(): void {
  }

  cancelOrder() {
    this.router.navigate([`${this.menu.path}`])
    this.dialogRef.close();
    this.localStorageService.removeProductInCard();
  }

}
