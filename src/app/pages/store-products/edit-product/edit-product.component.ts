import { Component, OnInit, Inject } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/entities/product.model';
import { ProductsService } from '../../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: ProductModel;
  constructor(
    private localStorageService: LocalStorageService,
    private produtService: ProductsService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    private _snackBar: MatSnackBar,


    @Inject(MAT_DIALOG_DATA) public data: any


  ) {

    this.product = {...data};

  }

  ngOnInit(): void {
   

  }

  guardar() {
    this.produtService.updateProduct(
      this.localStorageService.getInfoUserLogged().establishmentId,
      this.product.storeProductId,
      this.product.price,
      this.product.stock == 'SI' ? 'S' : 'N'
    ).subscribe((res: any) => {
        this._snackBar.open(`${res.message}`, 'cerrar', { duration: 2000 })
        this.dialogRef.close();
    
    })
  }

}
