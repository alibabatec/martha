import {Component, ElementRef, OnInit, ViewChild, HostListener} from '@angular/core';
import {Form, NgForm} from "@angular/forms";
import {SharedService} from "../../services/shared.service";
import {ProcedureService} from "../../services/procedure.service";
import {DatePipe} from "@angular/common";
import * as crypto from 'crypto-js';
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

declare var require: any;

@Component({
  selector: 'app-payment',
  templateUrl: './paybycard.component.html',
  styleUrls: ['./paybycard.component.scss']
})

export class PaybycardComponent implements OnInit {
  @ViewChild('otherPayment') otherPayment: ElementRef;
  @ViewChild('amtForm') form: NgForm;  
  isAmountShow: Boolean = false;
  CryptoJS;
  amount = true;
  value= false;
  paymentStatus = 'Your payments are up-to-date';
  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if(event.keyCode == 9) {
      if(event.target['id'] == 'outstanding') {
        this.amount = true;
      }else if(event.target['id'] == 'other') {
        this.amount = false;
        this.makePayment();
      }
    }
     if(event.shiftKey && event.keyCode == 9) {
        this.focusOut();
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
   if(event.target['id'] == 'outstandingTop') {
        this.amount = true;
      }else if(event.target['id'] == 'otherTop') {
        this.amount = false;
        this.makePayment();
      }
  }

  constructor(private eRef: ElementRef, private spinnerService: Ng4LoadingSpinnerService, private sharedService: SharedService, private procedureService: ProcedureService, private datePipe: DatePipe) {
    this.CryptoJS = require("crypto-js");
    this.isAmountShow = false;
    //this.spinnerService.hide();
  }

  nextPayment;
  merchantId;
  selectedAmount;
  remotePass;
  accountId;
  transId;
  ciphertext;
  companyId;
  nillAmount;
  lowAmount;
  hashId;
  url;
  notANumber;
  maxAmount;
  max;
  customer;
  actionURL = 'https://www.secpay.com/java-bin/ValCard';
  callbackUrl;// = 'http://bbc-aws-elb-public-dev-1-2104090933.eu-west-1.elb.amazonaws.com/bbc/#/pay/callback';
  templateId;
  accountMultipleId;
  gqeArrearsAmnt;
  isValid = true;
  inputFocused:Boolean;

  ngOnInit() {
    localStorage.removeItem('pd'); // Remove payment flag to avoid duplicate service call for same transaction ID
    this.callbackUrl = <any>window.location.href + '/callback';
    this.sharedService.setPaymentStatus(false);
    this.makePayment();
    this.companyId = this.sharedService.extractData(this.sharedService.getUserData(), "GQE_COMPANY_ID").formattedValue;

    // Prepare request payload
    const paymentReq = {
      "user":"SPPPORTAL",
        "keyValuePairs":{
          "#COMPANY_ID": this.companyId
        }
    };

    // Make service call
    this.procedureService.getPaymentData(paymentReq).subscribe(
      (res) => {
        this.merchantId = this.sharedService.extractData(res.fields, "GQE_PAY360_MERCHANT_ID").formattedValue+'-redir';
        const remoteStr = this.sharedService.extractData(res.fields, "GQE_PAY360_REMOTE_PASSWORD").formattedValue;
        this.remotePass = this.sharedService.docode(remoteStr);
        this.templateId = this.sharedService.extractData(res.fields, "GQE_PAY360_TEMPLATE").formattedValue;
        const data = this.sharedService.getUserData();
        let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:SS');
        date = date.split(':').join('').split('-').join('').split(' ').join('');
        this.nextPayment = this.sharedService.extractData(data, "GQE_NEXT_PAYMENT_AMOUNT").formattedValue;
        this.maxAmount = this.sharedService.extractData(data, "GQE_LICENCE_FEE").formattedValue;
        this.accountId = this.sharedService.extractData(data, "GQE_ACCOUNT_ID").formattedValue;
        this.accountMultipleId = this.sharedService.extractData(data, "GQE_MULTIPLE_ID").formattedValue;
        this.transId = this.accountId + '-' + this.accountMultipleId + '-portal-' + date;
        this.gqeArrearsAmnt = this.sharedService.extractData(data, "GQE_ARREARS_AMOUNT").formattedValue;
        this.customer = this.sharedService.extractData(data, "GQE_LICENCE_HOLDER").formattedValue;

        // Display success message
        this.showSuccessMsg();

        if ((this.merchantId === '' || this.merchantId.toLowerCase() === 'error')|| (this.remotePass === '' || this.remotePass.toLowerCase() === 'error') || (this.templateId === '' || this.templateId.toLowerCase() === 'error')) {
          this.isValid = false;
        } else {
          this.isValid = true;
        }
      },
      (err) => {
        this.isValid = false;
      }
    )
  }

  showSuccessMsg() {
    const gqeArr = this.gqeArrearsAmnt;
    const amnt = parseFloat(gqeArr);
    if (amnt > 0) {
      this.isAmountShow = false;
    } else {
      this.isAmountShow = true;
    }
  }

  addSign(val) {
    if (isNaN(val.substr(1, val.length)) === true) {
      this.notANumber = true;
    } else {
      this.notANumber = false;
    }
    if (val.substr(0, 1) != '£') {
      this.otherPayment.nativeElement.value = '£' + val;
    }
  }

  getAmount() {
    const amt = this.otherPayment.nativeElement.value;
    this.selectedAmount = (this.amount === true) ? ((parseFloat(this.gqeArrearsAmnt) > 0) ? this.gqeArrearsAmnt : this.nextPayment) : amt.substr(1, amt.length);
    this.hashId = this.transId + '' + this.selectedAmount + '' + this.remotePass;
    this.ciphertext = this.CryptoJS.MD5(this.hashId).toString();
    return this.selectedAmount;
  }

  makePayment() {
    let value;
    if (this.amount === false) {
      if (this.inputFocused === false || this.inputFocused === undefined) {
        this.inputFocused = true;
      }

      value = this.otherPayment.nativeElement.value;

      if (parseFloat((value.substr(1, value.length)).trim()) < 1 && value !== '£') {
        this.lowAmount = true;
      } else {
        this.lowAmount = false;
      }

      if (parseFloat((value.substr(1, value.length)).trim()) > this.maxAmount && value !== '£') {
        this.max = true;
      } else {
        this.max = false;
      }

      if ((value === '' || value === undefined || value.trim() === '£')) {
        this.nillAmount = true; // && value.trim().length>1
      } else {
        this.nillAmount = false;
      }
    } else {
      this.inputFocused = false;
      this.form.reset();
      value = '';
      this.lowAmount = false;
      this.nillAmount = false;
    }
  }

  onSubmit() {
    this.sharedService.setPaymentStatus(true);
    this.spinnerService.show();
  }

  focusOut() {
    this.makePayment();
    this.inputFocused = false;
  } 
}
