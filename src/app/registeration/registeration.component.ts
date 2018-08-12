import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {

  public max = new Date(2018, 3, 21, 20, 30);
  public mask = '00/00/0000';
  isClicked: boolean = false;
  isClickedAccnt: boolean = false;
  isClickedMonth: boolean = false;
  @ViewChild('hln') hln: ElementRef; // Local reference for Help icon - Licence Number (Desktop)
  @ViewChild('hnm') hnm: ElementRef; 

  // @HostListener('window:click', ['$event']) onclick(e) {
  //   console.log(e.target.className);
  //   if (e.target.className === 'help--icon') {
  //     // When Cookie div is displayed
  //     return;
  //   }
  //   this.hln.nativeElement.className = 'help--info hide';
  //   this.isClicked = false;
  // }
  constructor() { }

  ngOnInit() {
  }
showHelp(iconClicked: string) {
    if (iconClicked === 'postcode' && (!this.isClicked && !this.isClickedAccnt)) { // If licence help image is clicked, show licence help (and hide name help image) and vice-versa
      this.isClicked = true;
      this.isClickedAccnt = false;
      this.isClickedMonth = false;
    } else if (iconClicked === 'accountnumber' && !this.isClickedAccnt) {
      this.isClickedAccnt = true;
      this.isClicked =false;
      this.isClickedMonth =false;
    }else if(iconClicked === 'monthlyamount' && !this.isClickedMonth){
      this.isClickedMonth =true;
      this.isClicked = false;
      this.isClickedAccnt = false;
    }else{
      this.isClickedMonth =false;
      this.isClicked = false;
      this.isClickedAccnt = false;
    }
  }
}
