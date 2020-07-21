import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/entities/product.model';
import { ProductsService } from '../../services/products.service';
import { ProductsPaginate } from '../../models/paginates/products.paginate';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { EditProductComponent } from './edit-product/edit-product.component';


@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.css']
})
export class StoreProductsComponent implements OnInit {

  constructor(private productsService: ProductsService,
    private animateScrollService: NgAnimateScrollService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) { }

  productsAutocomplte: ProductModel[] = [];
  criteria: string = '';
  paginate: ProductsPaginate = new ProductsPaginate();
  ngOnInit(): void {

    this.searchProducts(this.criteria, 0);
  }


  search() {

    this.searchProducts(this.criteria, 0);


  }
  searchProducts(criteria: string, page: number) {
    this.productsService.getProductsByStore(this.localStorageService.getInfoUserLogged().establishmentId, criteria, page).subscribe((res: ProductsPaginate) => {
      this.paginate = res
      console.log(this.paginate)
    })
  }

  searchPaginate(page: number) {

    this.searchProducts(this.criteria, page);
    this.animateScrollService.scrollToElement('content-page', 1000)

  }

  openModalAddProducts() {

    let dialog = this.dialog.open(AddProductComponent, {})

    dialog.afterClosed().subscribe(result => {
      this.searchProducts(this.criteria, 0);
    });

  }

  editar(product: ProductModel) {
    let dialog = this.dialog.open(EditProductComponent, { data: product })
    dialog.afterClosed().subscribe(result => {
      this.searchProducts(this.criteria, 0);
    })
  }


}
