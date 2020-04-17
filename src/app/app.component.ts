import { Component, Injector , ElementRef} from '@angular/core';
import { ImagesService } from './services/images.service';
import { TranslateService} from '@ngx-translate/core';
import { DataProviderService } from './services/data-provider.service';
import { User } from './model/user';
import { AlarmsService } from './services/alarms.service';
import { singleSpaPropsSubject, SingleSpaProps } from 'src/single-spa/single-spa-props';
import { Subscription } from 'rxjs';

@Component({
  selector: 'satrack-alarms-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  singleSpaProps: SingleSpaProps = null;
  subscription: Subscription = null;
  environment:string = "dev";

  constructor(injector: Injector,
              private imageService: ImagesService,
              private translate: TranslateService,
              private alarmsService: AlarmsService,
              private dataProvider: DataProviderService,
              private elementRef: ElementRef) {
    
    // Inicializa traducción
    translate.setDefaultLang('en');
    translate.use('en'); 

    this.subscription = singleSpaPropsSubject.subscribe(props => {this.singleSpaProps = props})

    if (this.singleSpaProps != null)
    {
      console.log(this.singleSpaProps);
      this.receiveMessage(this.singleSpaProps);
    }
    else{
      this.setDevToken();
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCCYIYzlcNKt3hNo-4d7AWBu8EP_Xv5T0k';
    this.elementRef.nativeElement.appendChild(script);         

  }

  receiveMessage(data: any): void {    

    if (data != null && data != undefined)
      this.startApp(data);    
  }

  startApp(data: any) {

    this.dataProvider.setCountry(data["countryId"]);
    localStorage.setItem('userCountry', data["countryId"]);
    const language = (data["countryId"] === '5') ? 'en' : 'es';
    this.translate.use(language);

    // Inicializa usuario
    const currentUser: User = {
      token : data["token"],
      countryId: data["countryId"],
      userName: data["userName"].toLocaleLowerCase(),      
      timeZone: data["timeZone"]     
    };
    this.dataProvider.currentUser = currentUser;
  }

  setDevToken() {
    // Inicializa usuario
    const currentUser: User = {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiY2FtaWxvLm9ycmVnbyIsIm5iZiI6MTU3NjE2MDQ0NywiaWF0IjoxNTc2MTY3NjQ3LCJleHAiOjE1NzYyMTA4NDcsImlkVXNlciI6IjU5NTEyMDA2MiIsImNhbGxVcmwiOiIiLCJjbGllbnRJZCI6MTA2NjYsInVzdWFyaW9jcmVhZG9yIjoiNTk1MTIwMDYyIiwicmF6b25zb2NpYWwiOiI4MDAxODUzNzkiLCJyb2xlcyI6WyJvcGVyYWRvckNvbWFuZG9zIiwiYWRtaW4iLCJhY2Nlc29BbGFybWFzIiwiYWNjZXNvSW5mb3JtZXMiXSwiaWRQYWlzIjoxLCJzdGF0ZSI6ImFjdGl2ZSIsIlJlZmVyZW5jaWFTZXJ2aWNpb3MiOiIxRkZGRkZBIiwiUmVmZXJlbmNpYUFwbGljYWNpb25lcyI6IjgwIiwiVGltZVpvbmUiOiJQYWNpZmljL0hvbm9sdWx1IiwiTWVhc3VyZSI6IktpbG9tZXRyb3MiLCJIb3Vyc0RpZmZlcmVuY2UiOi0xMH0.FxgADsIv8pEm3pPr9F2f7efqnhRH6MTLEp6yPCC9opA',      
      countryId: 1,      
      userName: 'hola',      
      timeZone: 'hola',      
    };
    this.dataProvider.currentUser = currentUser;
    this.dataProvider.setCountry(currentUser.countryId);
    const language = (currentUser.countryId.toString() === '5') ? 'en' : 'es';
    this.translate.use(language);
  }

  GetZoneTranslate(timeZone) {

    var lenguage;

    switch (timeZone) {
        case 'America/Bogota':
            lenguage = 'es';
            break;
        case 'America/Panama':
            lenguage = 'es';
            break;
        case 'America/Guayaquil':
            lenguage = 'es';
            break;
        case 'America/Lima':
            lenguage = 'es';
            break;
        case 'America/New_York':
            lenguage = 'en';            
            break;
        default:
            lenguage = 'es';            
    }

    return lenguage;
}

}
