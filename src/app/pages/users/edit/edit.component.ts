import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserModel } from 'src/app/models/entities/user.model';
import ImageSnippet from 'src/app/models/entities/file.model';
import { DropdownsService } from '../../../services/dropdowns.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { depart, province, dist } from 'src/mocks/ubigeo';
import { mapUser } from 'src/app/helpers/user.helper';
import { MapsAPILoader, MouseEvent } from '@agm/core';

import { LocalStorageService } from '../../../services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditUserComponent implements OnInit {

  user: UserModel = new UserModel();
  latitude: number;
  longitude: number;
  zoom: number = 14;
  address: string;
  departament: any[] = [];
  province: any[] = [];
  dist: any[] = [];
  operationScheduleDropDown: any[] = [];
  shippingScheduleDropDown: any[] = [];
  selectedFile: ImageSnippet;
  errors: any[] = [];
  private geoCoder;
 
  
  
  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dropdownsService: DropdownsService,
    private localStorageService:LocalStorageService
  ) {
    this.loadDropDowns();
  }


  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
    });

    this.departament = depart;
    
    this.user = this.localStorageService.getInfoUserLogged();
    this.user.userType = this.localStorageService.userTypeLogged() == "CUSTOMER" ? "C":"P";
    this.latitude = this.user.latitude;
    this.longitude = this.user.longitude;

     this.user.departament = this.user.departament.charAt(0).toUpperCase()+ this.user.departament.slice(1);
     this.user.province = this.user.province.charAt(0).toUpperCase()+ this.user.province.slice(1);
     this.user.district = this.user.district.charAt(0).toUpperCase()+ this.user.district.slice(1);

   

    let deparment_id = this.departament.find(item => item.name == this.user.departament).id;
   
    let province_id = province.find(item => item.name == this.user.province).id;

    this.province = province.filter(item => item.department_id ==  deparment_id);
    this.dist = dist.filter(item => item.province_id ==  province_id);

    if(this.localStorageService.userTypeLogged() != "CUSTOMER" ){
      let type = this.localStorageService.getInfoUserLogged().establishmentType.name
       if(type.localeCompare("Bodega")){
         this.user.establishmentType = "1";
       }else{
        this.user.establishmentType = "2";
       }
    }
    this.user.entityId = this.localStorageService.userTypeLogged() != "CUSTOMER" ? this.localStorageService.getInfoUserLogged().establishmentId: this.localStorageService.getInfoUserLogged().customerId  

    



   
  }



  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.user.address = results[0].formatted_address;
          this.user.latitude = latitude;
          this.user.longitude = longitude;
        } else {
          console.error('No results found')
        }
      } else {
        console.error('Geocoder failed due to: ' + status)
      }

    });
  }

  changeDepartment(id: any) {
    this.province = province.filter(item => item.department_id == id)
  }

  changeprov(id: any) {
    this.dist = dist.filter(item => item.province_id == id);
  }

  loadDropDowns() {

    this.dropdownsService.getShedules().subscribe((res: any) => {
      let rows: any[] = res.data.schedules;

      this.operationScheduleDropDown = rows.filter(item => item.type == 'N');
      this.shippingScheduleDropDown = rows.filter(item => item.type == 'S');
    });
  }

  saveUser() {
    this.errors = [];

    if (this.user.userType == 'C') {
      this.userService.updateCustomer(mapUser(this.user)).subscribe((res: any) => {
        if (res.success) {

          let response = res.data.customer;
          response.type = environment.CUSTOMER;;
          
          this.localStorageService.saveInfoUserLogged(response);
          

          if (this.selectedFile) {
            this.userService.uploadPhoto(this.selectedFile.file, res.data.customer.customerId, 'Customer').subscribe((resimg: any) => {
              this._snackBar.open('El usuario se ha actualizado correctamente', 'cerrar', { duration: 2000 });
              this.router.navigate(['/my-orders'])
            })
          }else{
            this._snackBar.open('El usuario se ha actualizado correctamente', 'cerrar', { duration: 2000 });
            this.router.navigate(['/my-orders'])
          }
        }
      }, (err) => {
        if (err.status == 400) {
          this.errors = err.error.fields
        }
      });
    }

    if (this.user.userType == 'P') {
      this.userService.updateStore(mapUser(this.user)).subscribe((res: any) => {
        if (res.success) {
          let response = res.data.establishment;
          response.type = environment.PROVIDER;;
          
          this.localStorageService.saveInfoUserLogged(response);
          if (this.selectedFile) {
            this.userService.uploadPhoto(this.selectedFile.file, res.data.establishment.establishmentId, 'Establishment').subscribe((resph: any) => {
              this._snackBar.open('El usuario se ha actualizado correctamente', 'cerrar', { duration: 2000 });
              this.router.navigate(['/my-orders-store'])
            })
          } else {
            this._snackBar.open('El usuario se ha actualizado correctamente', 'cerrar', { duration: 2000 });
            this.router.navigate(['/my-orders-store'])
          }

        }



      }, (err) => {
        if (err.status == 400) {
          this.errors = err.error.fields
        }

      })
    }



  }

  oadDropDowns() {

    this.dropdownsService.getShedules().subscribe((res: any) => {
      let rows: any[] = res.data.schedules;

      this.operationScheduleDropDown = rows.filter(item => item.type == 'N');
      this.shippingScheduleDropDown = rows.filter(item => item.type == 'S');
    })
  }

  procesfile(imgageInput: any) {
    let file: File = imgageInput.files[0];
    let reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    })

    reader.readAsDataURL(file);

  }
}
