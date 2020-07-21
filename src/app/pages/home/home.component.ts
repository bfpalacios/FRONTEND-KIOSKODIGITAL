import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(localStorageService: LocalStorageService, router: Router) {
    if (localStorageService.userTypeLogged() == environment.PROVIDER) {
      router.navigate(['/my-orders-store/']);
    } else {
      router.navigate(['/map/']);
    }
  }

  ngOnInit(): void {
  }

}
