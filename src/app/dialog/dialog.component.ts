import { Component, OnInit, Input, Output, OnChanges, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {

// set the input decorators properties for passing the data from parent to child components 
  @Input('first') first: boolean = false;
  @Input() title: string;
  @Input('makeApay') makeApay: boolean = false;
  @Input('logBtn') logBtn: boolean = false;
  @Input() message: string;
  @Input() paymsgBefore: string;
  @Input() paymsgAfter: string;
  @Input() payamount: string;
  @Input() show: boolean;
  @Input('privacyBtn') privacyBtn: boolean = false;

  // set the output decorators for emitting the events from child to parent components 
  @Output('cut-btn') actionBtn = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();
  @Output() dashAction = new EventEmitter<any>();
  @Output('log-out') logOutBtn = new EventEmitter<any>();
  @Output('no-btn') noBtn = new EventEmitter<any>();
  
  constructor(private sharedService: SharedService) { }

 ngOnInit() {
       
  }

// emit the event for closing the dialog from parent to child component
  emitAction() {
   this.actionBtn.emit();
  }
// emit the event for navigating to home page
  navigateDash(){
    this.action.emit();
  }

// emit the function to log out  
  logOut(){
    this.logOutBtn.emit();
  }

 // close the dialog 
  close(){
    this.noBtn.emit();
  }
  onNavigate(){
    if (this.sharedService.getUSerLocalData('en') == 'true') {
      window.open("http://www.tvlicensing.co.uk/privacy-security-policies","_blank")
    } else {
      window.open("http://www.tvlicensing.co.uk/cy/privacy-security-policies","_blank")
    }
  }

   urlPrivacy() {
    let href;
    if (this.sharedService.getUSerLocalData('en') == 'true') {
      href = "http://www.tvlicensing.co.uk/privacy-security-policies";
    } else {
      href = "http://www.tvlicensing.co.uk/cy/privacy-security-policies";
    }
    return href;
  }
  
}