import {Component, OnInit} from '@angular/core';
import {SharedService} from "../services/shared.service";
import {PdfService} from "../services/pdf.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // public properties
  imgPath: string = 'assets/img/down_arrow.png';
  isAmountShow: boolean = false;
  licenceNo;
  licenceFee;
  validUntil;
  recieveTvLicence;
  paymnetMethod;
  nextPaymentDate;
  nextPaymentAmount;
  gqePayMissed;
  addressLine1;
  addressLine2;
  addressLine3;
  addressLine4;
  addressLine5;
  gqePostCode;
  licenceHolderName;
  paymentMethod;
  tvLicenceType;
  gqeArrearsAmnt;
  showPrintBtn;
  difference = 12;
  ad1; ad2; ad3; ad4; ad5;
  cookieValue = 'UNKNOWN';
  constructor(private sharedService: SharedService, private pdfService: PdfService, private cookieService: CookieService) {
    this.isAmountShow = false;
  }

  ngOnInit() {
    const data = this.sharedService.getUserData();
    this.licenceNo = this.sharedService.extractData(data, "GQE_LICENCE_NO").formattedValue;
    this.licenceFee = this.sharedService.extractData(data, "GQE_LICENCE_FEE").formattedValue;
    this.validUntil = this.sharedService.extractData(data, "GQE_LICENCE_EXPIRY_DATE").formattedValue;
    this.recieveTvLicence = this.sharedService.extractData(data, "GQE_LICENCE_RECEIVED").formattedValue;
    this.paymnetMethod = this.sharedService.extractData(data, "GQE_PAYMENT_METHOD").formattedValue;
    this.nextPaymentDate = this.sharedService.extractData(data, "GQE_NEXT_PAYMENT_DATE").formattedValue;
    this.nextPaymentAmount = this.sharedService.extractData(data, "GQE_NEXT_PAYMENT_AMOUNT").formattedValue;
    this.tvLicenceType = this.sharedService.extractData(data, "GQE_LICENCE_TYPE").formattedValue;
    this.paymentMethod = this.sharedService.extractData(data, "GQE_PAYMENT_METHOD").formattedValue;
    this.licenceHolderName = this.sharedService.extractData(data, "GQE_LICENCE_HOLDER").formattedValue;
    const addr1 = this.sharedService.extractData(data, "GQE_ADDRESS_LINE_1").formattedValue;
    this.addressLine1 = this.sharedService.breakString(addr1, 45, this.difference).str;
    this.ad1 = this.sharedService.breakString(addr1, 45, this.difference).diff;
    const addr2 = this.sharedService.extractData(data, "GQE_ADDRESS_LINE_2").formattedValue;
    this.addressLine2 = this.sharedService.breakString(addr2, 45, this.difference).str;
    this.ad2 = this.sharedService.breakString(addr2, 45, this.difference).diff;
    const addr3 = this.sharedService.extractData(data, "GQE_ADDRESS_LINE_3").formattedValue;
    this.addressLine3 = this.sharedService.breakString(addr3, 45, this.difference).str;
    this.ad3 = this.sharedService.breakString(addr3, 45, this.difference).diff;
    const addr4 = this.sharedService.extractData(data, "GQE_ADDRESS_LINE_4").formattedValue;
    this.addressLine4 = this.sharedService.breakString(addr4, 45, this.difference).str;
    this.ad4 = this.sharedService.breakString(addr4, 45, this.difference).diff;
    const addr5 = this.sharedService.extractData(data, "GQE_ADDRESS_LINE_5").formattedValue;
    this.addressLine5 = this.sharedService.breakString(addr5, 45, this.difference).str;
    this.ad5 = this.sharedService.breakString(addr5, 45, this.difference).diff;
    this.gqePostCode = this.sharedService.extractData(data, "GQE_POSTCODE").formattedValue;
    this.gqePayMissed = this.sharedService.extractData(data, "GQE_NO_OF_MISSED_PAYMENTS").formattedValue;
    this.gqeArrearsAmnt = this.sharedService.extractData(data, "GQE_ARREARS_AMOUNT").formattedValue;
    const gqe = this.gqePayMissed;
    const num = parseInt(gqe);

    // private object & properties
    const obj = {
      title: 'dialoghomeTitle',
      para: 'You need to make a payment to stay on the Simple Payment Plan.',
      message: 'dialogHomeMsg',
      paymsgBefore: 'diaPayMsgBefore',
      paymsgAfter: 'diaPayMsgAfter',
      payamount: '£'+this.nextPaymentAmount,
      makeApay: true,
      logBtn: false,
      privacyBtn: false
    }

    const obj1 = {
      title: 'dialoghomeTitle1',
      para: 'You need to make a payment to stay on the Simple Payment Plan.',
      message: 'dialogHomeMsg1',
      makeApay: false,
      logBtn: false,
      privacyBtn: true
    }

    if (num >= 2 && localStorage.getItem('isCount') === 'true') {
      this.sharedService.modal(obj);
    }else if(!this.cookieService.check('firstVisit')){
      this.sharedService.modal(obj1);
      this.cookieService.set('firstVisit', 'true');
    }
    this.showSucessMsg();
  }

  // Display the success and failure Message
  showSucessMsg() {
    const gqeArr = this.gqeArrearsAmnt;
    const amount = parseFloat(gqeArr);
    if (amount > 0) {
      this.isAmountShow = false;
    } else {
      this.isAmountShow = true;
    }
  }

  // Download Pdf
  download() {
    const _self = this;
    this.pdfService.createPdf(this);
  }

  // Print the Pdf
  print() {
    const _self = this;
    this.pdfService.print(_self);
  }
}
