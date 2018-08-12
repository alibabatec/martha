import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebService} from '../services/web.service';
import {SharedService} from "./shared.service";
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProcedureService {

  constructor(private http: HttpClient, private webService: WebService, private sharedService: SharedService) {}

  // Login Service
  login(data) {
    // const url = environment.apiURL + 'loginverify/';
    const url = './assets/api/user.json';
    return this.webService.getRequest(url);
  }

  // Get schedule of payment
  getScheduleData(data) {
    //const url = environment.apiURL + 'accountpayment/';
    const url = './assets/api/schedule.json';
    return this.webService.getRequest(url);
  }

  // Get payment data
  getPaymentData(data) {
    //const url = environment.apiURL + 'paydetails/';
    const url = './assets/api/user.json';
    return this.webService.getRequest(url);
  }

  // Payment Acknowledgement
  paymentAcknowledge(data) {
    //const url = environment.apiURL + 'payackservice/';
    const url = './assets/api/pay360.json';
    return this.webService.getRequest(url);
  }

  getData() {
    const url = './assets/api/user.json';
    return this.webService.getRequest(url);
  }
}
