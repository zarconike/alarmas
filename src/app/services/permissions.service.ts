import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DataProviderService } from './data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private dataProvider: DataProviderService) { }

  checkAlarmsPermission(): boolean {
    const userCountry = this.dataProvider.currentUser.countryId;

    return environment.allowedCountries.some((allowedCountry) => {
      return allowedCountry === userCountry;
    }) && true;
  }
}
