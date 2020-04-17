import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { AlarmsService } from 'src/app/services/alarms.service';
import { Alarm } from '../../model/alarm';
import { timer } from 'rxjs';
import { DataProviderService } from '../../services/data-provider.service';
import { ScrollEvent } from 'ngx-scroll-event';

@Component({
  selector: 'satrack-alarms-web-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.scss']
})


export class AlarmListComponent implements OnInit {
  constructor(private alarmService: AlarmsService,
              private dataProvider: DataProviderService) { }

  //#region modelos
  alarms: Array<Alarm>;
  alarmTypes: Array<any>;
  //#endregion
  
  //#region traducciones
  alarmsTitle = 'ALERTS';
  alarmsAttend = 'ATTEND';  
  translateParam = { value: 'some' };
  //#endregion

  //#region variables
  pageNumberDinamic: number = 0;
  pageSizeDinamic: number = 2;
  entrance: boolean = true;
  dateOperation: Date;
  dateInitilize: Date;
  haveAlarms : boolean = false;
  error : boolean = false;
  isBusy: boolean = true;
  blank: boolean  =false;
  //#endregion

  @Output() showAlert = new EventEmitter<Alarm>();
  @Output() showAlarmsList = new EventEmitter<any>();

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.bottomReached) {
    }
  }

  bottomReached(): boolean {
    return (window.outerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  ngOnInit() {  
    this.observableTimer();    
  }

  observableTimer() {
    const source = timer(0, 30000);
    const abc = source.subscribe(val => {
      this.GetAlarms();
    });
  }

  GetAlarms() {
    
    this.ResetVariablesInitialize();    
    this.alarmService.GetAlarms(this.dataProvider.currentUser.userName, 0, 10).then((data) => {

      this.alarms = data.alarms;
      this.GetAlarmsType ();
      this.isBusy = false;
      this.error = false;      
      
    }).catch((error)=>{

      this.ResetVariablesCatch();
      if (error.status == 404)      
        this.ResetVariablesCatch404 ();                       
    });   
  
    this.pageSizeDinamic = 2;
    this.pageNumberDinamic= 0;
  } 

  GetAlarmsType ()
  {
      this.alarmService.GetAlarmsType(this.dataProvider.country, this.dataProvider.culture).then((alarmTypes) => {
            
          this.alarmTypes = alarmTypes; 
          this.haveAlarms = this.alarms != null && this.alarms.length > 0 ? true : false;                               

          this.alarms.forEach(element => {
            element.title = this.GetAlarmTitle(element.type.id);
          })  
          
          this.blank = !this.haveAlarms && !this.error && !this.isBusy ? true : false;

      }).catch((error)=>{

        this.ResetVariablesCatch();
        if (error.status == 404)
          this.ResetVariablesCatch404 ();
      });
  }


  GetAlarmReload(pageNumber:number, pageSize:number) {
        
    this.alarmService.GetAlarms(this.dataProvider.currentUser.userName, pageNumber, pageSize).then((data) => {
      var alarmsAux: Array<Alarm>;          
      alarmsAux = data.alarms;      

      this.alarmService.GetAlarmsType(this.dataProvider.country, this.dataProvider.culture).then((alarmTypes) => {
        this.alarmTypes = alarmTypes;
        this.error = false;

        alarmsAux.forEach(element => {
          element.title = this.GetAlarmTitle(element.type.id);
          this.alarms.push(element);
        });
        
        this.haveAlarms = this.alarms != null && this.alarms.length > 0 ? true : false;
        this.error = false;
        
      }).catch((error)=>{
        this.haveAlarms = false;
        this.error = true;  
      });
      
    }).catch((error)=>{
        this.haveAlarms = false;
        this.error = true;  
    });
  } 

  GetDetectedEndList(event: ScrollEvent) {
    
    this.dateInitilize = new Date();        
    if (!this.entrance)
    {
      this.ValidateDate ();
    }

    if (event.isReachingBottom && this.entrance) {
      this.dateOperation = new Date();
      this.GetAlarmReload(this.pageNumberDinamic, this.pageSizeDinamic);
      this.pageNumberDinamic += 1;
      this.pageSizeDinamic += 2; 
      this.entrance = false;      
    }  
  } 

  public ValidateDate ()
  {
    var differenceMinute = this.dateInitilize.getMinutes() - this.dateOperation.getMinutes();
    var diffferenceSeconds = this.dateInitilize.getSeconds() - this.dateOperation.getSeconds();

    this.entrance = (differenceMinute > 1) || (diffferenceSeconds > 1) ? true : false;
  }

  GetAlarmTitle(typeId: number) {
    return this.alarmTypes.find(element =>
      element.Id === typeId
    ).Cultures[0].Title;
  }

  RefreshList(event)
  {
    this.GetAlarms();
  }

  ResetVariablesInitialize()
  {
    this.isBusy = true;
    this.error = false;
    this.haveAlarms = false;
    this.blank = false;
  }

  ResetVariablesCatch()
  {
    this.haveAlarms = false;
    this.error = true;  
    this.isBusy = false;
  }

  ResetVariablesCatch404 ()
  {
    this.error = false; 
    this.blank = true;
  }

}
