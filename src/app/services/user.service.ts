import { Injectable } from '@angular/core';
import { ProviderService } from './base/provider.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private providerService: ProviderService) {


  }


  saveCustomer(customer: any) {
    return this.providerService.post('customers', customer);
  }

  saveStore(store: any) {
    return this.providerService.post('establishments', store);
  }

  uploadPhoto(file: File, id: number, user_type: string) {
    return this.providerService.upLoadFile(`common/upload/${id}?table=${user_type}`, file)
  }

  updateCustomer(customer: any) {
    return this.providerService.put(`customers/${customer.entityId}`, customer);
  }

  updateStore(store: any) {
    return this.providerService.put(`establishments//${store.entityId}`, store);
  }

  changePassword(password:any){
    return this.providerService.put(`security/changepassword`,password);
  }
}
