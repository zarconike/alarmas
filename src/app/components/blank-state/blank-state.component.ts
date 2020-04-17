import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'satrack-alarms-web-blank-state',
  templateUrl: './blank-state.component.html',
  styleUrls: ['./blank-state.component.scss']
})
export class BlankStateComponent implements OnInit {

  @Output() refresh = new EventEmitter<any>();


  //#region traducciones
  noAlert = 'NOALERT';
  refreshButton = 'REFRESHBUTTON';
  translateParam = { value: 'some' };
  //#endregion

  constructor() { }

  ngOnInit() {
  }

  RefreshCommand()
  {
    this.refresh.emit("no alarms");
  }

}
