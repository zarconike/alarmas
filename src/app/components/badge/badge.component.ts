import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {Location} from '@angular/common';
import { AlarmsService } from 'src/app/services/alarms.service';
import { timer } from 'rxjs';
import { DataProviderService } from '../../services/data-provider.service';
import { MatSidenav } from '@angular/material';
import { Alarm } from '../../model/alarm';
import { UsageCounterService } from 'src/app/services/usagecounter.service';
import { UsageCounter } from 'src/app/model/usagecounter';


@Component({
  selector: 'satrack-alarms-web-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  @ViewChild(MatSidenav, {static: false}) sideNav: MatSidenav;

  badgeCounter = '';
  badgeMessage = 'NOALERTS';
  translateParam = { value: 'some' };
  showBadge = true;
  lastAlarmPage = -1;
  showDetail = false;
  selectedAlarm: Alarm;
  usageCounter = new UsageCounter();

  constructor(private alarmsService: AlarmsService,
              private dataProvider: DataProviderService,
              private usageCounterService: UsageCounterService,
              location: Location) 
              {
                 //this.registerUsageCounter(location);              
              }

  ngOnInit() {
    //this.observableTimer();
  }

  registerUsageCounter(location: Location)
  {     
    this.usageCounter.TypeService= 'NUEVO MODULO ALARMAS';
    this.usageCounter.actionModule= 'Ingreso al nuevo modulo de alarmas';
    this.usageCounter.counter= 'CallToAction';
    this.usageCounter.urlResource= location.path();
    
    this.usageCounterService.RegisterUsageCounter(this.usageCounter,this.dataProvider.currentUser.token).then((data) => {            
      
    }).catch((error)=>{                          
    });     
  }

  observableTimer() {
    const source = timer(0, 10000);
    const abc = source.subscribe(val => {
      this.getAlarms(this.lastAlarmPage);
    });
  }

  getAlarms(pageNumber: number) {
    this.lastAlarmPage += 1;
    this.alarmsService.GetAlarms(this.dataProvider.currentUser.userName, pageNumber, 20).then((response: any) => {
      this.updateBadge(response);
      if (response.pager.totalPages === this.lastAlarmPage) {
        this.lastAlarmPage -= 1;
      }
    }, (e: any) => {
      console.log('ERROR');
      console.log(e);
    });
  }

  updateBadge(data: any) {
    if (this.getUnreadAlarmsCount(data.alarms) >= 0) {
      this.badgeCounter = '!';
      this.badgeMessage = 'PENDINGALERTS';
    } else {
      this.badgeCounter = '';
      this.badgeMessage = 'NOALERTS';
    }
  }

  getUnreadAlarmsCount(alarms: any[]) {
    return alarms.filter(alarm => {
      return !alarm.read;
    }).length;
  }

  showAlarmsList() {
    this.sideNav.toggle();
    this.badgeCounter = '';
    this.badgeMessage = 'NOALERTS';
  }

  showAlarm(alarm: Alarm) {
    this.showDetail = true;
    this.selectedAlarm = alarm;
  }
}
