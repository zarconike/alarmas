import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  @Output() changeDataUser: EventEmitter<boolean> = new EventEmitter();
  country: number;
  culture: string;
  user: string;
  _token:string;

  get currentUser(): User {
    //const value = JSON.parse(localStorage.getItem(`CURRENTUSER`));
    const value = JSON.parse(this.user);
    return value || null;
  }
  set currentUser(value: User) {
   // localStorage.setItem(`CURRENTUSER`, JSON.stringify(value));
    this.user = JSON.stringify(value);
    this.changeDataUser.emit(true);
  }

  get token(): string {
    //return localStorage.getItem('TOKEN');
    return this._token;
  }
  set token(value: string) {
    this.token = value;
    //localStorage.setItem('TOKEN', value);
  }

  get lastPage(): string {
    return localStorage.getItem('LASTPAGE');
  }
  set lastPage(value: string) {
    localStorage.setItem('LASTPAGE', value);
  }

  setCountry(country: any) {
    this.country = country;
    this.setCulture(this.country);
  }

  private setCulture(country: any) {
    this.culture = (country === '5') ? 'English' : 'Spanish';
  }
}
