import {Injectable} from '@angular/core';
import {ProcedureService} from '../services/procedure.service';
import {Observable} from 'rxjs/Observable';
import {Router} from "@angular/router";
import {SharedService} from "../services/shared.service";

@Injectable()
export class AuthService {

// private property  
  private isUserLoggedIn: boolean;

  constructor(private procedureService: ProcedureService, private router: Router,private sharedService: SharedService) {
    this.isUserLoggedIn = false;

  }
// set the value by user end
  setUserLoggedIn(val) {
    this.isUserLoggedIn = val;
    localStorage.setItem('auth', val);
  }

// get the value   
  getUserLoggedIn(): any {
    //return (localStorage.getItem('auth'))?localStorage.getItem('auth'):this.isUserLoggedIn;
    if (!sessionStorage.getItem('userdetails') && localStorage.getItem('auth') === 'true') {
      // const user = JSON.parse(localStorage.getItem('formData'));
      const user = this.sharedService.getUserFormData();
      return new Observable<any>(observar => {
        this.procedureService.login(user).subscribe(
          (res) => {
            this.sharedService.setUserData(res.fields);
            this.setUserLoggedIn(true);
            observar.next(localStorage.getItem('auth')) ? localStorage.getItem('auth') : this.isUserLoggedIn;
          }
        )
      })
    } else {
      return new Observable<any>(observar => {
        observar.next(localStorage.getItem('auth')) ? localStorage.getItem('auth') : this.isUserLoggedIn;
      })
    }
  }

// logout method is used for logged out  
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('formData');
    sessionStorage.clear();
    this.setUserLoggedIn(false);
  }

}
