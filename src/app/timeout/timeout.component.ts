import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.scss']
})

export class TimeoutComponent implements OnInit {
  @Input('timeleft') timeleft;
  @Input('show') show = false;
  @Output('yes-btn') yesBtn = new EventEmitter<any>();
  @Output('reset-btn') resetBtn = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  getMeOut() {
    this.resetBtn.emit()
  }

  reset() {
    this.yesBtn.emit()
  }
}
