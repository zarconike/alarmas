import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'satrack-alarms-web-no-available',
  templateUrl: './no-available.component.html',
  styleUrls: ['./no-available.component.scss']
})
export class NoAvailableComponent implements OnInit {

  @Output() reintent = new EventEmitter<any>();

  //#region traducciones
  noAvailableTitle = 'NOAVAILABLETITLE';
  noAvailableDescription = 'NOAVAILABLEDESCRIPTION';
  reintentButton = 'REINTENTBUTTON';
  translateParam = { value: 'some' };
  
  //#endregion

  constructor() { }

  ngOnInit() {
  }

  ReintentCommand()
  {
    this.reintent.emit("no available");
  }

}
