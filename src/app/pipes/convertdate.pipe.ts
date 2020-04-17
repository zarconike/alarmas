import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment-timezone';
import { Moment } from 'moment';
import { DataProviderService } from '../services/data-provider.service';

@Pipe({name: 'convertdate'})
export class ConvertDate implements PipeTransform {

    constructor(private translateService: TranslateService,
                private dataProvider: DataProviderService) { }
  
    hours: number;
    ampm: string;
    minute: string;
    dayText : string;
    dias:number;
    dateAlarm = new Date();
    datePipe = new DatePipe('en-US');
    TODAY : string = "TODAY";
    YESTERDAY : string = "YESTERDAY";

    currentDate: moment.Moment = moment();
    currentTime: string;
    daysFrom2017: number;
    humanized: string;
    humanizedNow: string;
    weeks: number;

    transform(value: Date): any {
                   
        value = moment.tz(value, this.dataProvider.currentUser.timeZone);
        var currentDay = moment.tz(new Date(), this.dataProvider.currentUser.timeZone);

        this.dateAlarm = new Date(value);
        this.dias = -1;

        this.hours =  this.dateAlarm.getHours() % 12;
        this.hours = this.hours ? this.hours : 12;
        this.minute = (this.dateAlarm.getMinutes() < 10) ? '0' + this.dateAlarm.getMinutes() : this.dateAlarm.getMinutes().toString();
        this.ampm = this.dateAlarm.getHours() > 11 ? 'PM' : 'AM';
        
        if (this.datePipe.transform(this.dateAlarm,"yyyy-MM-dd") == this.datePipe.transform(currentDay,"yyyy-MM-dd"))
        {
            this.translateService.get(this.TODAY, {value: this.TODAY}).subscribe((res: string) => {
                this.dayText = res;
            });            
        }
        else
            if (this.datePipe.transform(this.dateAlarm,"yyyy-MM-dd") == 
                this.datePipe.transform(currentDay(currentDay.setHours(-1)),"yyyy-MM-dd"))
            {
                this.translateService.get(this.YESTERDAY, {value: this.YESTERDAY}).subscribe((res: string) => {
                    this.dayText = res;
                }); 
            }
            else                
                {
                    this.dayText = this.datePipe.transform(this.dateAlarm,"dd/MM/yyyy");
                }

        return  this.dayText + ", " + this.hours + ":" + this.minute + " " + this.ampm;        
        
    }
}