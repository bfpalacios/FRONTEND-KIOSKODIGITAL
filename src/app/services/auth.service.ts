import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor( private localStorageService:LocalStorageService,private router: Router,) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorageService.userIsLogged()) {
      return true;
      
    } else {
      this.router.navigate(['/login']);
      return false;
    };
  }
}
