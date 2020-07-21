import { Injectable } from '@angular/core';
import { ProviderService } from './base/provider.service';

@Injectable({
  providedIn: 'root'
})
export class DropdownsService {

  constructor(private providerService: ProviderService) { }

  getShedules(){
    return this.providerService.getQuery(`common/schedules`);
  }
}
