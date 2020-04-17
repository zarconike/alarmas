import { HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable,Output, EventEmitter } from '@angular/core';
import { AlarmsResponse } from '../model/alarmsResponse';
import { environment } from '../../environments/environment';
import { timeout,catchError} from 'rxjs/operators';
import { AlarmType } from '../model/alarmType';
import { AlarmOperation } from '../model/alarmOperation';
import { Annotation } from '../model/annotation';
import { Attend } from '../model/attend';
import { AttendResponse } from '../model/attendResponse';

@Injectable({
  providedIn: 'root'
})

export class AlarmsService  {

  baseurl = environment.alarmsApi;
  @Output() errorList = new EventEmitter<string>();


  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  
  GetAlarms(user: string, page: number, take: number): Promise<any> {

    return this.http.get<AlarmsResponse>(this.baseurl + 'alarmsbyuser/' + user + '/' + page + '/' + take).
              pipe(timeout(5000),
                   catchError((error: HttpErrorResponse) => {                                              
                                throw (error);
                  })
              ).toPromise();
  }

  GetAlarmsType(country: number, culture: string): Promise<Array<AlarmType>> {  

    return this.http.get<Array<AlarmType>>(this.baseurl + 'alarmtype/language/' + culture + '/country/' + country).
            pipe(timeout(5000),
                catchError((error: HttpErrorResponse) => {                                              
                              throw (error);
                })
            ).toPromise();
  }

  GetAnnotation(alarmId: string): Promise<Annotation> {

    return this.http.get<Annotation>(this.baseurl + 'getannotation/' + alarmId).
          pipe(timeout(5000),
              catchError((error: HttpErrorResponse) => {                                              
                            throw (error);
              })
          ).toPromise();
  }

  ReadAlarms(alarmOperation: AlarmOperation): Promise<any> {
        
    return this.http.post<any>(this.baseurl + 'read', alarmOperation).
          pipe(timeout(5000),
              catchError((error: HttpErrorResponse) => {                                              
                            throw (error);
              })
          ).toPromise();
  }

  SetAttend(attend: Attend): Promise<AttendResponse> {

    return this.http.post<AttendResponse>(this.baseurl + 'attend', attend).
            pipe(timeout(5000),
                catchError((error: HttpErrorResponse) => {                                              
                              throw (error);
                })
            ).toPromise();
  }

}
