import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {SharedService} from "./shared.service";

@Injectable()
export class PaymentauthService implements CanActivate {

  constructor(private router: Router,private sharedService: SharedService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |  Promise<boolean> | boolean{
    // this.router.navigate(['/']);
    return this.sharedService.getPaymentStatus().map(e => {
      if (e === true) {
        return true;
      }else{
        this.router.navigate(['/pay']);
      }
    });
    // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  }
}
