import { NgModule } from '@angular/core';
import { BadgeComponent } from './components/badge/badge.component';
import { Routes, RouterModule } from '@angular/router';
import { AlarmListComponent } from './components/alarm-list/alarm-list.component';
import { AlarmDetailComponent } from './components/alarm-detail/alarm-detail.component';
import { MapComponent } from './components/map/map.component';
import { APP_BASE_HREF } from '@angular/common';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

const routes: Routes = [
  {
  path: 'alarm-list',
  component: AlarmListComponent
},
{
  path: 'alarm-detail',
  component: AlarmDetailComponent
},
{
  path: 'map',
  component: MapComponent
},
{
  path: 'badge',
component: BadgeComponent},
{ 
  path: '**', 
component: EmptyRouteComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
})
export class AppRoutingModule { }
