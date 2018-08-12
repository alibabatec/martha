import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError} from "rxjs/operators";
import {SharedService} from "./shared.service";

@Injectable()
export class WebService {

  constructor(private sharedService: SharedService,private http: HttpClient, private spinnerService: Ng4LoadingSpinnerService) {}

  // Function to make http post request
  request(url, data) {
    // show the spinner
    this.sharedService.setSpinner(true);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache'
    });

    // post request to get the response from the server
    return this.http.post(url, data, {headers: headers}).timeout(30000).do(
      (res) => {
        this.sharedService.setSpinner(false);
      },
      (err) => {
        catchError(this.handleError); // then handle the error
      }
    ).pipe(
      catchError(this.handleError), // then handle the error
    ).finally(
      () => {
        this.sharedService.setSpinner(false);
      }
    );
  }

  // get method for dummy json
  getRequest(url) {
    return this.http.get<any>(url);
  }

  private handleError(error: HttpErrorResponse) {
    try {
      // hide the spinner
      this.sharedService.setSpinner(false);
    } catch(err) {
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error.message);

      return new ErrorObservable(
        `We cannot find your details on our system. Please check the details you have entered and try again.`
      );
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      //console.error(`Backend returned code ${error.status}, ` +  `body was: ${error.error}`);

      return new ErrorObservable(
        `We cannot find your details on our system. Please check the details you have entered and try again.`
      );
    }
  };
}
