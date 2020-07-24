import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { dist, depart, province } from '../../../mocks/ubigeo';
import { UserModel } from 'src/app/models/entities/user.model';
import { UserService } from 'src/app/services/user.service';
import { mapUser } from '../../helpers/user.helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DropdownsService } from '../../services/dropdowns.service';
import ImageSnippet from 'src/app/models/entities/file.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

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
  message: string;
  private geoCoder;


  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dropdownsService: DropdownsService,
  ) {
    this.loadDropDowns();
  }

  ngOnInit(): void {
    this.departament = depart;
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getAddress(this.latitude, this.longitude);
      });
    }
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

  changeDepartment(name: any) {
    let id = depart.find(item => item.name == name).id;
    this.province = province.filter(item => item.department_id == id)
  }

  changeprov(name: any) {
    let id = province.find(item => item.name == name).id;
    this.dist = dist.filter(item => item.province_id == id);
  }

  saveUser() {
    this.errors = [];
    this.message = '';
    console.log(this.user)
    if (this.user.userType == 'C') {
      this.userService.saveCustomer(mapUser(this.user)).subscribe((res: any) => {
        if (res.success) {
          if (this.selectedFile) {
            this.userService.uploadPhoto(this.selectedFile.file, res.data.customer.customerId, 'Customer').subscribe((res: any) => {
              this._snackBar.open('El usuario se ha registrado correctamente, porfavor inicie sesion ', 'cerrar', { verticalPosition: 'top', duration: 3000 });
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 3000);
            });
          } else {
            this._snackBar.open('El usuario se ha registrado correctamente, porfavor inicie sesión ', 'cerrar', { verticalPosition: 'top', duration: 3000 });
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }
        }else{
          this.message = res.message;
        }
      }, (err) => {
        if (err.status == 400) {
          this.errors = err.error.fields;
        }
      });
    }

    if (this.user.userType == 'P') {
      this.userService.saveStore(mapUser(this.user)).subscribe((res: any) => {
        if (res.success) {
          if (this.selectedFile) {
            this.userService.uploadPhoto(this.selectedFile.file, res.data.establishment.establishmentId, 'Establishment').subscribe((resph: any) => {
              this._snackBar.open('El usuario se ha registrado correctamente, porfavor inicie sesion ', 'cerrar', { verticalPosition: 'top', duration: 3000 });
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 3000);
            })
          } else {
            this._snackBar.open('El establecimiento se ha registrado correctamente, porfavor inicie sesion ', 'cerrar', { verticalPosition: 'top', duration: 3000 });
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }
        }else{
          this.message = res.message;
        }

      }, (err) => {
        if (err.status == 400) {
          this.errors = err.error.fields
        }

      })
    }



  }

  loadDropDowns() {

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

  saveimage() {
    this.userService.uploadPhoto(this.selectedFile.file, 10, 'Customer').subscribe((res: any) => {


    }, (err: any) => {
      console.log(err)
    })
  }


}


