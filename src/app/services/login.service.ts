import { Injectable } from '@angular/core';
import { ProviderService } from './base/provider.service';
import { LoginModel } from '../models/entities/login.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private providerService: ProviderService) { }

  login(modelLogin: LoginModel) {
    return this.providerService.post(`security/login`, modelLogin);
  }

  forgetpassword(user:string){

    return this.providerService.post(`common/forgetpassword`,{email:user});

  }
}
