import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { StoreService } from '../../services/store.service';
import { StoreModel } from 'src/app/models/entities/store.models';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number;
  lng: number;
  zoom: number = 15;
  getAddress: any;
  bodegas: StoreModel[] = []
  stores: StoreModel[] = []



  constructor(private storeService: StoreService,
    private localStorageService: LocalStorageService,
    private router: Router) {


  }
  getUserLocation() {

    navigator.geolocation.getCurrentPosition((pos) => {
      // console.log(pos.coords.accuracy > 1001)
      // if (pos.coords.accuracy > 1001) {

        let position = this.localStorageService.getInfoUserLogged()
        this.lat = position.latitude;
        this.lng = position.longitude;
      // } else {
        // this.lat = pos.coords.latitude;
        // this.lng = pos.coords.longitude;
      // }
      this.storeService.getAllStoresByType(1, this.lat, this.lng).subscribe((res: StoreModel[]) => {
        this.stores = res;

      });
      this.storeService.getAllStoresByType(2, this.lat, this.lng).subscribe((res: StoreModel[]) => {
        this.bodegas = res;

      })

    }, (err) => { console.log(err) }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000
    })

  };




  ngOnInit() {
    this.getUserLocation();

  }

  redirect(item: StoreModel) {
    this.localStorageService.saveInfoStore(item);
    this.router.navigate(['/store/', item.id])
  }

  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }

}
