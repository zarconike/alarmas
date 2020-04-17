import { HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable,Output, EventEmitter } from '@angular/core';
import { timeout,catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UsageCounter } from '../model/usagecounter';

@Injectable({
    providedIn: 'root'
  })

export class UsageCounterService  {

    baseurl = environment.usageCounterApi;

    constructor(private http: HttpClient) { }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    RegisterUsageCounter(usageCounter: UsageCounter, token: string): Promise<any> {
                
        var httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
       
        return this.http.post<any>(this.baseurl, usageCounter, httpOptions).
              pipe(timeout(5000),
                  catchError((error: HttpErrorResponse) => {                                              
                                throw (error);
                  })
              ).toPromise();
    }

}