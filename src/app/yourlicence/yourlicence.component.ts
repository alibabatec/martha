import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {SharedService} from "../services/shared.service";
import * as jsPDF from 'jspdf';
import {DOCUMENT} from "@angular/common";
import {PdfService} from "../services/pdf.service";
@Component({
  selector: 'app-yourlicence',
  templateUrl: './yourlicence.component.html',
  styleUrls: ['./yourlicence.component.scss']
})

export class YourlicenceComponent implements OnInit {

// public properties
  doc;
  licenceNo;
  licenceFee;
  validUntil;
  recieveTvLicence;
  tvLicenceType;
  addressLine1;
  addressLine2;
  addressLine3;
  addressLine4;
  addressLine5;
  gqePostCode;
  licenceHolderName;
  paymentMethod;
  difference = 12;
  ad1; ad2; ad3; ad4; ad5;
  constructor(@Inject(DOCUMENT) private document: Document,private sharedService:SharedService,private pdfService:PdfService) {
  }
  ngOnInit() {
    const data = this.sharedService.getUserData();
    this.licenceNo = this.sharedService.extractData(data,"GQE_LICENCE_NO").formattedValue;
    this.paymentMethod = this.sharedService.extractData(data,"GQE_PAYMENT_METHOD").formattedValue;
    this.licenceFee = this.sharedService.extractData(data,"GQE_LICENCE_FEE").formattedValue;
    this.validUntil = this.sharedService.extractData(data,"GQE_LICENCE_EXPIRY_DATE").formattedValue;
    this.recieveTvLicence = this.sharedService.extractData(data,"GQE_LICENCE_RECEIVED").formattedValue;
    this.tvLicenceType = this.sharedService.extractData(data,"GQE_LICENCE_TYPE").formattedValue;

    this.licenceHolderName = this.sharedService.extractData(data,"GQE_LICENCE_HOLDER").formattedValue;
    const addr1 = this.sharedService.extractData(data,"GQE_ADDRESS_LINE_1").formattedValue;
    this.addressLine1 = this.sharedService.breakString(addr1, 45, this.difference).str;
    this.ad1 = this.sharedService.breakString(addr1, 45, this.difference).diff;
    const addr2 = this.sharedService.extractData(data,"GQE_ADDRESS_LINE_2").formattedValue;
    this.addressLine2 = this.sharedService.breakString(addr2, 45, this.difference).str;
    this.ad2 = this.sharedService.breakString(addr2, 45, this.difference).diff;
    const addr3 = this.sharedService.extractData(data,"GQE_ADDRESS_LINE_3").formattedValue;
    this.addressLine3 = this.sharedService.breakString(addr3, 45, this.difference).str;
    this.ad3 = this.sharedService.breakString(addr3, 45, this.difference).diff;
    const addr4 = this.sharedService.extractData(data,"GQE_ADDRESS_LINE_4").formattedValue;
    this.addressLine4 = this.sharedService.breakString(addr4, 45, this.difference).str;
    this.ad4 = this.sharedService.breakString(addr4, 45, this.difference).diff;
    const addr5 = this.sharedService.extractData(data,"GQE_ADDRESS_LINE_5").formattedValue;
    this.addressLine5 = this.sharedService.breakString(addr5, 45, this.difference).str;
    this.ad5 = this.sharedService.breakString(addr5, 45, this.difference).diff;
    this.gqePostCode = this.sharedService.extractData(data,"GQE_POSTCODE").formattedValue;
  }

  // download and create the pdf
  download() {
    const _self = this;
    this.pdfService.createPdf(this);
  }

  // print the pdf
  print() {
    const _self = this;
    this.pdfService.print(_self);
  }

  printPage() {
    window.print();
  }
}

