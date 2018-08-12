import { Component, OnInit, ChangeDetectorRef, AfterContentChecked, ViewChild, ElementRef, HostListener } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router, NavigationEnd} from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {AuthService} from "./services/auth.service";
import {SharedService} from "./services/shared.service";
//import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterContentChecked {
  // public properties
  login = false;
  hideOnlogin = false;
  title: string;
  message: string;
  paymsgBefore: string;
  paymsgAfter: string;
  payamount: string;
  show = false;
  fn: any;
  selectedLang: boolean;
  isTimeout = false;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  makeApay;
  logBtn;
  privacyBtn;
  first;
  loaderVisible;
  private hasChanges: any; 
  constructor(private spinnerService: Ng4LoadingSpinnerService, private authService: AuthService, 
    private sharedService: SharedService, 
    private translate: TranslateService, 
    private router: Router, private cdr: ChangeDetectorRef, 
    private idle: Idle, private keepalive: Keepalive/*, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics*/, private cookieService: CookieService) {

    // to add the languages english and welsh
    translate.addLangs(["en", "cy"]);

    // set the default language english
    translate.setDefaultLang('en');
    this.selectedLang = true;

    // private property to detect the browser language
    const browserLang = translate.getBrowserLang();
    if (browserLang === 'en') {
      this.sharedService.setUSerLocalData(true);
    } else {
      this.sharedService.setUSerLocalData(false);
    }

    // translate the language by using it
    translate.use(browserLang.match(/en|cy/) ? browserLang : 'en');
  }

  // reset the all properties
  reset() {
    this.isTimeout = false;
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  // close the dialog,logout and navigate to expired page
  getMeOut() {
    this.isTimeout = false;
    this.authService.logout();
    this.router.navigate(['expired']);
  }

  // close the dialog,logout and navigate to login page
  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
    localStorage.removeItem('currentUserName');
    this.show = false;
  }

  // close the dialog
  close() {
    this.show = false;
  }

  // set the count for closing the dialog
  emitAction() {
    localStorage.setItem('isCount', "false");
    this.show = false;
  }
  
  // to select the language conditionally
  langSelected() {
    if (localStorage.getItem('en') === 'true') {
      this.switchLanguage('cy');
      localStorage.setItem('en', 'false');
    } else {
      this.switchLanguage('en');
      localStorage.setItem('en', 'true');
    }
  }

  // switch and transalte the language
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    // show the sppinner image
    this.spinnerService.show();
    this.sharedService.showModal().subscribe(
      (res) => {
        this.title = res.title;
        this.makeApay = res.makeApay;
        this.logBtn = res.logBtn;
        this.message = res.message;
        this.paymsgBefore = res.paymsgBefore;
        this.paymsgAfter = res.paymsgAfter;
        this.payamount = res.payamount;
        this.first = res.first;
        this.privacyBtn = res.privacyBtn;
        if (res.fn) {
          this.fn = () => res.fn();
        } else {
          this.fn = null;
        }
        this.show = true;
      }
    );
    
    this.sharedService.spinner().subscribe(
      (value) => {
        this.loaderVisible = value;
      }
    );
    this.router.events.subscribe((evt) => {
      this.sharedService.setSpinner(false);
      this.show = false;
      this.isTimeout = false;
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      if (this.router.url !== '/signin' && this.router.url !== '/') {
        this.hideOnlogin = true;
      } else {
        this.hideOnlogin = false;
      }
      if (this.router.url === '/signin' || this.router.url === '/' || this.router.url === '/expired' || this.router.url === '/about' || this.router.url === '/contact' || this.router.url === '/help') {
        this.idle.stop();
      } else {
        if (localStorage.getItem('auth') === 'true') {
          // sets an idle timeout of 20 minutes
          this.idle.setIdle(1140);
          // sets a timeout period of 1 minute
          this.idle.setTimeout(60);
          // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
          this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

          this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
          this.idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.getMeOut();
            this.timedOut = true;
          });
          this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
          this.idle.onTimeoutWarning.subscribe((countdown) => {
            this.isTimeout = true;
            this.idleState = 'You will time out in ' + countdown + ' seconds!'
          });

          // sets the ping interval to 15 seconds
          this.keepalive.interval(15);
          this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
          this.reset();
        }
      }
    });
  }

  // emit the event to close the dialog
  actionFn() {
    this.show = false;
    if (this.fn != null) {
      this.fn();
    }
  }

  // detect the change detection
  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
}
