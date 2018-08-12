import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

// placing the TV licensing urls conditionally
   url() {
    let href;
    if(this.sharedService.getUSerLocalData('en')=='true')
      href = "http://www.tvlicensing.co.uk/about";
    else
      href = "http://www.tvlicensing.co.uk/cy/about";
      return href;
  }
  ngOnInit() {
  }

}
