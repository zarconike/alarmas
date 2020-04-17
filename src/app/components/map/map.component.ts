
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Alarm } from 'src/app/model/alarm';

@Component({
  selector: 'satrack-alarms-web-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit {
  @Input() alarm: Alarm;
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    
    map: google.maps.Map;
    lat = 40.73061;
    lng = -73.935242;

    coordinates = new google.maps.LatLng(this.lat, this.lng);
    mapOptions: any;
    gMaps : any;

    marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });
    
    ngAfterViewInit() {
      this.mapInitializer();
    }

    mapInitializer() {

      this.gMaps =  google.maps;
      this.mapOptions = this.gMaps.MapOptions;
  
      this.mapOptions = {
        center: this.coordinates,
        zoom: 8,
      };  

      this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
      this.marker.setMap(this.map);
    }
}
