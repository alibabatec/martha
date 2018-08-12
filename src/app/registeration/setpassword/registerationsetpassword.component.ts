import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-registerationsetpassword',
  templateUrl: './registerationsetpassword.component.html',
  styleUrls: ['./registerationsetpassword.component.scss']
})
export class RegisterationSetPasswordComponent implements OnInit {

   public max = new Date(2018, 3, 21, 20, 30);
  public mask = '00/00/0000';
  isClicked: boolean = false;
  isClickedAccnt: boolean = false;
  isClickedMonth: boolean = false;
  constructor() { }

  ngOnInit() {
  }
showHelp(iconClicked: string) {
    if (iconClicked === 'email' && (!this.isClicked && !this.isClickedAccnt)) { // If licence help image is clicked, show licence help (and hide name help image) and vice-versa
      this.isClicked = true;
      this.isClickedAccnt = false;
      this.isClickedMonth = false;
    } else if (iconClicked === 'pwd' && !this.isClickedAccnt) {
      this.isClickedAccnt = true;
      this.isClicked =false;
      this.isClickedMonth =false;
    }else if(iconClicked === 'mobileno' && !this.isClickedMonth){
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
