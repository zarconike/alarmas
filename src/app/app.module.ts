import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BadgeComponent } from './components/badge/badge.component';
import { AngularMaterialModule } from './common/angular-material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AlarmDetailComponent } from './components/alarm-detail/alarm-detail.component';
import { AlarmListComponent } from './components/alarm-list/alarm-list.component';
import { SubstringPipe } from './pipes/substring.pipe';
import { ConvertDate } from './pipes/convertdate.pipe';
import { MapComponent } from './components/map/map.component';
import { ScrollEventModule } from 'ngx-scroll-event';
import {FormsModule}  from  '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BlankStateComponent } from './components/blank-state/blank-state.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoAvailableComponent } from './components/no-available/no-available.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { assetUrl } from 'src/single-spa/asset-url';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, assetUrl('lang/'), '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BadgeComponent,
    AlarmDetailComponent,
    AlarmListComponent,
    SubstringPipe,
    ConvertDate,
    MapComponent,
    BlankStateComponent,
    NoAvailableComponent,
    EmptyRouteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ScrollEventModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
