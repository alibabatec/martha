import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {ProcedureService} from '../../services/procedure.service';
import {SharedService} from "../../services/shared.service";
import {DOCUMENT} from "@angular/common";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  // public properties
  showHideClass = '';
  login = false;
  hideOnlogin = false;
  logoLink = false;
  userName;
  isFirst;

  // public object
  obj = {
    title: 'dialogTitle',
    para: 'dialogPara',
    message: 'dialogMsg',
    makeApay: false,
    logBtn: true,
    first: true,
    privacyBtn: false
  };
  // Output decorator for language detection from child to parent components
  @Output() langChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(DOCUMENT) private document: Document,public router: Router, private procedure: ProcedureService, private sharedService: SharedService) {
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
            this.hideOnlogin = false;
            this.login = false;
          } else {
            this.login = false;
            this.hideOnlogin = true;
          }
        } else {
          if (localStorage.getItem('auth') === 'true') {
            this.login = true;
            this.hideOnlogin = true;
            this.logoLink = true;
            const data = this.sharedService.getUserData();
            this.userName = this.sharedService.extractData(data, "GQE_LICENCE_HOLDER").formattedValue;
          }
        }
      }
    });

    this.isFirst = false;
    
  }

  // emit the value by this function to change the language
  languageChange(lang) {
    this.langChange.emit(lang);
  }

  // navigate to schedule page
  navigateSchedule() {
    this.router.navigate(['pay/schedule']);
  }

  // display the dialog from here
  signOut() {
    this.sharedService.modal(this.obj);
  }

  urlImg() {
    let src;
    if (this.sharedService.getUSerLocalData('en') == 'true') {
      src = "assets/img/TV_licensing_logo.png";
    } else {
      src = "assets/img/tvlicensingwelsh.png";
    }
    return src;
  }

  // display the SPP logo in both languages conditionally
  urlSimpleImg() {
    let src;
    if (this.sharedService.getUSerLocalData('en') == 'true') {
      src = "assets/img/ssp_logo.png";
    } else {
      src = "assets/img/ssp_logo-wlesh.png";
    }
    return src;
  }

  // remains the same page
  continuePage() {
    this.isFirst = false;
    localStorage.setItem('firstTime', 'true');
  }
  addHmtl(){
    const doc= this.document.querySelector('html').classList.add('overflowy--hidden');
  }
  removeCls(){
    const doc= this.document.querySelector('html').classList.remove('overflowy--hidden');
  }
  ngOnInit() {
    // private properties
    const username = this.sharedService.getUserName();
    if (username != null) {
      this.userName = username;
    }
    // check the value for first time visitor
    if (!localStorage.getItem('firstTime')) {
      this.isFirst = true;
    }
    
  }
}
