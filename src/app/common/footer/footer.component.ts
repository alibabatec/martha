import {Component, OnInit, Input} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

 // public properties 
  login = false;
  logoLink = false;

  constructor(public router: Router, private sharedService: SharedService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/' || event.url == '/signin' || event.url == '/expired' || event.url == '/contact' || event.url == '/offboard' || event.url == '/about' || event.url == '/forgotlicence') {
          if (event.url == '/about') {
            if (localStorage.getItem('auth') === 'true') {
              this.login = true;
            } else {
              this.login = false;
              this.logoLink = true;
            }
          } else if (event.url == '/offboard') {
            this.login = false;
          } else if (event.url == '/contact' && localStorage.getItem('auth') === 'true') {
            this.login = true;
          } else if (event.url == '/forgotlicence') {
            this.logoLink = true;
          } else if (event.url == '/' || event.url == '/signin') {
            this.logoLink = false;
            this.login = false;
          } else {
            this.login = false;
          }
        } else {
          this.login = true;
          this.logoLink = true;
        }

      }
    });

  }

  // Display the TV Licensing image conditionally
  url() {
    let href;
    if (this.sharedService.getUSerLocalData('en') == 'true') {
      href = "http://www.tvlicensing.co.uk/accessibility";
    } else {
      href = "http://www.tvlicensing.co.uk/cy/accessibility";
    }
    return href;
  }

  // Display the SPP image conditionally
  urlSimpleImg() {
    let src;
    if (this.sharedService.getUSerLocalData('en') == 'true') {
      src = "assets/img/ssp_logo.png";
    } else {
      src = "assets/img/ssp_logo-wlesh.png";
    }
    return src;
  }

  ngOnInit() {
  }

// Placing the Urls of Cookies for English and Welsh conditionally
  urlCookie() {
    let href:string= '#';
    return href;
  }

// Placing the Urls of Privacy for English and Welsh conditionally
  urlPrivacy() {
    let href:string='#';
    return href;
  }

// Display the TV Licensing Logo conditionally
  urlImg() {
    let src;
    if (this.sharedService.getUSerLocalData('en') == 'true') {
      src = "assets/img/TV_licensing_logo.png";
    } else {
      src = "assets/img/tvlicensingwelsh.png";
    }
    return src;
  }

}
