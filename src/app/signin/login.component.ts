import { Component, ElementRef, HostListener, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NgForm} from '@angular/forms'
import {WebService} from '../services/web.service';
import {ProcedureService} from '../services/procedure.service';
import {AuthService} from '../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  // Initialise variables
  model: any = {};
  error = '';
  returnUrl: string;
  submitted = false;
  isActive;
  licenceFoc = true;
  lastNameFoc = true;
  postCodeFoc = true;
  errorMessage = '';
  fieldsError = true;
  isClicked: boolean = false;
  isClickedLst: boolean =false;
  @ViewChild('hln') hln: ElementRef; // Local reference for Help icon - Licence Number (Desktop)
  @ViewChild('hnm') hnm: ElementRef; // Local reference for Help icon - Last Name (Desktop)
  
  // Handle help image hide/show
  @HostListener('window:click', ['$event']) onclick(e) {
    if (e.target.className === 'img-info') {
      // When Cookie div is displayed
      return;
    }
    this.hln.nativeElement.className = 'help-ln-d hide';
    this.hnm.nativeElement.className = 'help-nm-d hide';
    this.isClickedLst = false;
    this.isClicked = false;
    this.licenceFoc = false;
  }

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private webService: WebService, private procedure: ProcedureService, private authService: AuthService, private sharedService: SharedService) {
    // Don't let user go to login page when already logged in
    if (localStorage.getItem('auth') === 'true') {
      this.router.navigate(['/home']);
    }
  }

  // Handle form submission
  onSubmit(form: NgForm) {
    let LICENCE_NO = form.controls.licencenumber.value,
      SURNAME = form.controls.lastname.value,
      POSTCODE = form.controls.postcode.value;
    this.getLogin(LICENCE_NO, SURNAME, POSTCODE); // Call login function with parameters
    this.submitted = true; // Enable Sign-in button
    this.fieldsError = false; // Hide error messages
  }

  // Make login verification call and handle the response
  getLogin(licence, surname, postcode) {
    // Create request payload
    const formData = {
      "user": "SPPPORTAL",
      "keyValuePairs":
        {
          "#LICENCE_NO": licence,
          "#SURNAME": surname,
          "#POSTCODE": postcode
        }
    };

    // Make service call
    this.procedure.login(formData).subscribe(
      (res) => {
        const licence_no = this.sharedService.extractData(res.fields, "GQE_LICENCE_NO").formattedValue;
        if (licence_no.toLowerCase() === "error" || licence_no === "") {
          this.errorMessage = "login.loginError";
        } else {
          this.sharedService.setUserFomrData(formData);
          const userName = this.sharedService.extractData(res.fields, "GQE_LICENCE_HOLDER").formattedValue;
          this.sharedService.setUserName(userName);
          this.sharedService.setUserData(res.fields);
          this.isActive = this.sharedService.extractData(res.fields, "GQE_LICENCE_STATUS").formattedValue;
          if (this.isActive === "ACTIVE") {
            this.authService.setUserLoggedIn(true);
            localStorage.setItem('isCount', 'true');
            localStorage.setItem('lastName', surname);
            this.router.navigate(['home']);
          } else if (this.isActive === "OFFBOARDED") {
            this.router.navigate(['offboard']);
          } else if (this.isActive === "CANCELLED") {
            this.router.navigate(['expired']);
          } else if (this.isActive === "") {
            this.errorMessage = "login.loginError";
          }
        }
      },
      error => this.errorMessage = "login.loginError"
    );
  }

  queryMethod() {
    this.route.queryParams.subscribe(params => {
      let LICENCE_NO = params['LICENCE_NO'];
      let SURNAME = params['SURNAME'];
      let POSTCODE = params['POSTCODE'];
      if (LICENCE_NO != undefined && SURNAME != undefined && POSTCODE != undefined) {
        this.getLogin(LICENCE_NO, SURNAME, POSTCODE);
        this.submitted = true;
      } else {
        this.authService.logout();
      }
    });
  }

  // Display sign-in page's SPP logo based on Language
  urlSimpleImg() {
    let src;
    if (this.sharedService.getUSerLocalData('en') == 'true') {
      src = "assets/img/login_left_side_ssp_logo.png";
    } else {
      src = "assets/img/ssp_logowelsh.png";
    }
    return src;
  }

  ngOnInit() {
    this.queryMethod();
  }

  // Display help images accordingly
  showHelp(iconClicked: string) {
    if (iconClicked === 'licence' && (!this.isClicked && !this.licenceFoc)) { // If licence help image is clicked, show licence help (and hide name help image) and vice-versa
      this.hln.nativeElement.className = 'help-ln-d show';
      this.hnm.nativeElement.className = 'help-nm-d hide';
      this.isClicked = true;
      this.licenceFoc = true;
    } else if (iconClicked === 'name' && (!this.isClickedLst && !this.licenceFoc)) {
      this.hln.nativeElement.className = 'help-ln-d hide';
      this.hnm.nativeElement.className = 'help-nm-d show';
      this.isClickedLst = true;
      this.licenceFoc = true;
    }else{
      this.isClicked = false;
      this.isClickedLst = false;
      this.licenceFoc = false;
    }
  }
}
