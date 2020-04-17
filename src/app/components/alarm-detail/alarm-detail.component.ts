import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alarm } from '../../model/alarm';
import { AlarmsService } from 'src/app/services/alarms.service';
import { UserService } from 'src/app/services/user.service';
import { AlarmOperation } from 'src/app/model/alarmOperation';
import { UserAttend } from 'src/app/model/userAttend';
import { Annotation } from 'src/app/model/annotation';
import { Attend } from 'src/app/model/attend';
import { DataProviderService } from '../../services/data-provider.service';
import { AttendResponse } from 'src/app/model/attendResponse';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'satrack-alarms-web-detail',
  templateUrl: './alarm-detail.component.html',
  styleUrls: ['./alarm-detail.component.scss']
})
export class AlarmDetailComponent implements OnInit {
//#region model
  alarmOperation = new AlarmOperation();
  userAttend = new UserAttend();
  annotation = new Annotation();
  attend = new Attend();
  attendResponse = new AttendResponse();
  //#endregion

 //#region traducciones
 buttonAttend = 'BUTTONATTEND';
 alarmsAttend = 'ATTEND';  
 enterComment = 'ENTERCOMMENTS';  
 translateParam = { value: 'some' };
 //#endregion

 //#region variables
  commentsAttend : string;
  commentUserAttend:string;
  errorAttend : boolean;
  error : boolean = false;
  isBusy: boolean = true;

  @Input() alarm: Alarm;
  @Output() hideAlarm = new EventEmitter<boolean>();
  @Output() showAlarmsList = new EventEmitter<any>();
  //#endregion 


  constructor(private alarmService: AlarmsService, private userService: UserService,
              private dataProvider: DataProviderService, private _snackBar: MatSnackBar) {    
   }

    ngOnInit() {

      this.isBusy = true;    

      if (!this.alarm.read)
          this.SetReadAlarm();

      if (this.alarm.status != 1)      
          this.GetDataAttended();
     
      this.error = false;
      this.isBusy = false;
    }

    GetDataAttended()
    {
        this.GetUserAttend(this.alarm.userName, this.alarm.lastModified);
        this.GetAnnotationAlarm();        
    }

    SetReadAlarm() {
     
      this.alarmOperation.alarmId = this.alarm.id;
      this.alarmOperation.userName = this.dataProvider.currentUser.userName;    

      this.alarmService.ReadAlarms(this.alarmOperation).then((data) => {

        var response = data; 
        this.error = false;   
            
      }).catch((errorApi)=>{
        this.error = true;
        
        if (errorApi.status == 200)
            this.error = false;                
      }); 
    } 

    GetUserAttend(user:string, dateOperation:Date) {
         
      this.userAttend.dateAttention = dateOperation;
      this.userService.GetUserAttend(user).then((data) => {

        this.userAttend = data; 
       
      }).catch((error)=>{
        this.error = true;  
      });  
    }   

    GetAnnotationAlarm() {
            
      this.alarmService.GetAnnotation(this.alarm.id).then((data) => {

          this.annotation = data;
          this.userAttend.comments = this.annotation.comment;
          this.userAttend.name = this.annotation.userName;
          this.userAttend.dateAttention = this.annotation.date;    
          this.commentUserAttend = this.annotation.comment.replace("APP => ","");

      }).catch((error)=>{
        this.error = true;  
      });   
    }  
    
    public SetAttendAlarmCommand()
    {
        this.SetAttendAlarm();

    }
   
    SetAttendAlarm() {
       
      this.SetEntityAlarm();
      this.alarmService.SetAttend(this.attend).then((data) => {

        this.attendResponse = data;  
        this.alarm.status = 0; 

        if (this.attendResponse.message != null)
        {          
          this.OpenSnackBar(this.LimitString(this.attendResponse.message), "");
          this.GetDataAttended();          
        }
        else{
           this.SetDataAfterOperationAttend();
        }  
        
        this.error = false; 
        this.isBusy = false;  
                                                              
      }).catch((error)=>{
        this.error = true;  
        this.isBusy = false;
      }); 
    }
    
    SetEntityAlarm()
    {
      this.isBusy = true;

      this.attend.alarmId = this.alarm.id;
      this.attend.comment = this.commentsAttend == undefined ? "Sin comentarios" : this.commentsAttend;
      this.attend.date = new Date();
      this.attend.userName = this.dataProvider.currentUser.userName;    
            
    }

    SetDataAfterOperationAttend()
    {          
      this.GetUserAttend(this.dataProvider.currentUser.userName, new Date());
      this.commentUserAttend = this.commentsAttend;
    }

    OpenSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition:'right',
        panelClass : ['config-style-snackbar']
      });
    }

    public LimitString (message: string)
    {
       let messageSnack: string = message;
        
       if (message.length >= 40)
        messageSnack = message.substring(0,39) + "...";

        return messageSnack;
    }

    Reintent(event)
    {
      this.ngOnInit();
    }
}
