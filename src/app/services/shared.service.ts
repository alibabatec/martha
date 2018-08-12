import {EventEmitter, Injectable,Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import * as crypto from 'crypto-js';

// declare it for base64 decode using require
declare var require: any;
@Injectable()
export class SharedService {

// public properties
  CryptoJS;
  key = "targetgateway";
  userName;
  constructor(){
    this.CryptoJS = require("crypto-js");
  }

// set the property to emit it for dialog value and method accross the app
  showAlert = new EventEmitter<{ title: string, message: string,paymsg: string,payamount:string, fn: any }>();

// set the property for spinner visibility
  spinVisible=new EventEmitter<Boolean>();

// emit the method to pass the object
  modal(obj: any) {
    this.showAlert.emit(obj);
  }

// open the dialog
  showModal() {
    return this.showAlert;
  }

// set the data from the user
  setUserData(data) {

  // encrypt the data which is passed by user end
    const encrypted = this.CryptoJS.AES.encrypt(JSON.stringify(data), this.key);

  // store the user data into session storage into encrypted form
    sessionStorage.setItem('userdetails', encrypted);
  }

// get the user data from the session storage and decrypt it
  getUserData() {
    const userDetails = sessionStorage.getItem('userdetails');
    const decrypted = this.CryptoJS.AES.decrypt(userDetails, this.key).toString(this.CryptoJS.enc.Utf8);;
    return JSON.parse(decrypted);
  }

// set the form contorls data into locastorage from the user & encrypt it
  setUserFomrData(data) {
    const encrypted = this.CryptoJS.AES.encrypt(JSON.stringify(data), this.key);
    localStorage.setItem('formData', encrypted);
  }

// get the form controls data from the localstorage and decrypt it
  getUserFormData() {
    const formDetails = localStorage.getItem('formData');
    const decrypted = this.CryptoJS.AES.decrypt(formDetails, this.key).toString(this.CryptoJS.enc.Utf8);;
    return JSON.parse(decrypted);
  }

// set the current user name into locastorage from the user & encrypt it
  setUserName(val){
    const encrypted = this.CryptoJS.AES.encrypt(val, this.key);
    localStorage.setItem('currentUserName', encrypted);
  }

// get the current user name into locastorage from the user & decrypt it
  getUserName(){
     const userData = localStorage.getItem('currentUserName');
     if(userData != null || userData != undefined){
          const decrypted = this.CryptoJS.AES.decrypt(userData, this.key).toString(this.CryptoJS.enc.Utf8);;
          return decrypted;
     }else{
       return null;
     }

  }

// set the language into locastorage from the user
  setUSerLocalData(value){
      localStorage.setItem('en',value);
  }

// get the language from locastorage by the user
  getUSerLocalData(value){
      return localStorage.getItem('en');
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('formData');
    sessionStorage.clear();
    //this.authService.setUserLoggedIn(false);
  }

// extract the data form the response which we are getting while requesting the http post
  extractData(arr: Array<any>, code) {
    const data= arr.filter(function (ele,i) {
      if(ele.code === code) {
        return ele;
      }
    })
    return data[0];
  }

// set the payment status value into storage
  setPaymentStatus(value) {
    localStorage.setItem('psv', value);
  }

// get the payment status value
  getPaymentStatus() {
    return new Observable<any>(
      (observer) => {
        observer.next(JSON.parse(localStorage.getItem('psv')))
      });
  }

// set the spinner to emit the spinner
  setSpinner(value) {
    this.spinVisible.emit(value);
  }

// return the state of spinner
  spinner() {
    return this.spinVisible;
  }

// break the string
  breakString(str,count, dif){
    const s=str;
    let lineCount=0;
    if (count>=s.length)return {str:s, diff:lineCount};
    if(s.length>count){
      lineCount += dif;
      let newStr = s.substr(0,count);
      let strArr = newStr.split(" ");
      strArr.pop();
      let restText = strArr.join(" ");
      let strLength = restText.length;
      return {str: restText+" \n "+s.substr(strLength, s.length), diff: lineCount};
    }
  }

// get the browser name and hide the print license button conditionally
  getBrowser() {
    return (() => {
      let ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
      }
      if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
      return M.join(' ');
    })();
  }

// decode the barcode image which is getting in base64
  docode(base64) {
    const decodedB64=window.atob(base64);
    let arr = decodedB64.split(",");
    arr.shift();
    let newArr = arr.map(function(ele){
      return String.fromCharCode(<any>ele-65539);//hash value of BBC
    });
    return newArr.join('');
  }

  
}
