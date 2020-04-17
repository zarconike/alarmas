import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAttend } from '../model/userAttend';
import { environment } from '../../environments/environment';
import { timeout, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseurl = environment.userApi;

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  GetUserAttend(user: string): Promise<UserAttend> {
    
    return this.http.get<UserAttend>(this.baseurl + 'permissionattend/' + user).
          pipe(timeout(5000),
              catchError((error: HttpErrorResponse) => {                                              
                            throw (error);
              })
          ).toPromise();
  }  
}
