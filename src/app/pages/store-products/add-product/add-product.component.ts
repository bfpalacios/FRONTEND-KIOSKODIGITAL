import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/entities/product.model';
import { ProductsService } from '../../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreOrdersComponent } from '../../store-orders/store-orders.component';
import { StoreService } from '../../../services/store.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productsAutocomplte: ProductModel[] = [];
  criteria: string = '';
  constructor(private productsService: ProductsService,
    private _snackBar: MatSnackBar,
    private storeService: StoreService,
    private localStorageService:LocalStorageService
  ) { }

  ngOnInit(): void {
  }
  search() {
    this.productsService.getProducts(this.criteria).subscribe((res: any) => {
      this.productsAutocomplte = res;
    })
  }

  addProduct(product: ProductModel) {
    if (product.price == 0.00) {
      this._snackBar.open(`El Precio del producto no puede ser 0.00`, 'cerrar', { duration: 2000 })
    } else {
      this.storeService.addProductStore(product.productId,product.price,this.localStorageService.getInfoUserLogged().establishmentId).subscribe((res:any)=>{
        if(res.success){
          this._snackBar.open(`El Producto ha sido agregado correctamente`, 'cerrar', { duration: 2000 })
          product.price = 0.00;

        }else{
          this._snackBar.open(`El Producto ya se encuentra agregado en el establecimiento`, 'cerrar', { duration: 2000 })
        }
      })
    }
  }

}
