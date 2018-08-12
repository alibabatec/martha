import {EventEmitter, Injectable, Output,OnInit} from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {ConfigService} from './config.service'
import {PdftranslateService} from '../services/pdftranslate.service';
import {TranslateService} from '@ngx-translate/core';
import {SharedService} from "../services/shared.service";
pdfMake.fonts = {
  customFont: {
    //  normal: 'verdana.ttf',
    normal: 'verdana.ttf',
    bold: 'verdana.ttf',
    italics: 'verdana.ttf',
    bolditalics: 'verdana.ttf'
  }
};
@Injectable()
export class PdfService implements OnInit{
  docDefinition;
  barcodeDefinition;
  pdfTvLicence;
  pdfFooterTVLicense;
  pdfTvLicenceNo;
  pdfTvLicenceFee;
  pdfTvPayMethod;
  pdfTvValidUntil;
  pdfTvLicenceType;
  pdfTvLicenceRecieve;
  pdfCommunicationsAct;
  pdfTermsandConditionsTitle;
  pdfTvLicenceAbout;
  pdfTermsandConditionsTitle1;
  pdfTermsandCondsTitle1MsgA;
  pdfTermsandCondsTitle1MsgB;
  pdfTermsandCondsTitle1MsgC;
  pdfTermsandConditionsTitle2;
  pdfTermsandCondsTitle2MsgA;
  pdfTermsandCondsTitle2MsgB;
  pdfTermsandCondsTitle2MsgC;
  pdfTermsandConditionsTitle3;
  pdfTermsandCondsTitle3MsgA;
  pdfTermsandCondsTitle3MsgB;
  pdfTermsandCondsTitle3MsgC;
  pdfTermsandCondsTitle3MsgD;
  pdfTermsandConditionsTitle4;
  pdfTermsandCondsTitle4MsgA;
  pdfTermsandCondsTitle4MsgB;
  pdfPaypointBarCode;
  pdfPaypointPara;
  filePdfname;

  constructor(private sharedService: SharedService, private config: ConfigService,private pdfTranslate: PdftranslateService,private translateLang:TranslateService) {
    //alert(this.pdfPaypointBarCode = this.pdfTranslate.translateBar.en.pdfPayPointBarCode)
   // alert(this.pdfPaypointBarCode = this.pdfTranslate.translateBar.welsh.hello);
  }
  drawPage(obj) {
    this.docDefinition = {
      defaultStyle: {
        font: 'customFont'
      },
      content: [
        {
          style: 'tableExample',
          color: '#444',
          margin: [35, 0, 0, 0],
          table: {
            widths: [300, 'auto'],
            headerRows: 1,
            // keepWithHeaderRows: 1,
            body: [
              [
                {
                  text: this.pdfTvLicence,
                  fontSize: 12,
                  border: [true, true, false, false],
                  margin: [5, 8, 0, 0],
                  fillColor: '#205768 ',
                  style: 'whiteFont',
                  alignment: 'left'
                },
                {
                  image: this.config.TvLicenceBase64(),
                  // margin:[-5,-3,10,-2],
                  padding: [0, 0, 0, 0],
                  alignment: 'center',
                  // height:30,
                  width: 110,
                  fillColor: '#1E1D1D',
                  style: 'tableHeader'
                }
              ],
              [
                {
                  colSpan: 2,
                  image: this.config.whiteStripe(),
                  width: 320,
                  height: 10,
                  border: [true, false, true, false]
                }],
              [
                {
                  rowSpan: 12,

                  border: [true, false, false, true],
                  stack: [
                    {
                      image: this.config.pdfPattern(),
                      // alignment: 'center',
                      width: 310.5,
                      // height:268,// Gotham
                      height: 255,//Verdana
                      // fit:[300,500],
                      margin: [-4, -3, -10, -1.5],
                      absolutePosition: {x: 75, y: 88},
                      // margin: [-2, -2.5, 0, -1.5],
                      padding: [0, 0, 0, 0],
                    },
                    {
                      text: obj.licenceHolderName,
                      fontSize: 12,
                      bold:true,
                      absolutePosition: {x: 90, y: 100},
                      style: 'blackFont'
                    },
                    {
                      text: obj.addressLine1,
                      // bold:true,
                      fontSize: 10,
                      style: 'blackFont',
                      absolutePosition: {x: 90, y: 120}
                    },
                    {
                      text: obj.addressLine2,
                      // bold:true,
                      fontSize: 10,
                      style: 'blackFont',
                      absolutePosition: {x: 90, y: 132+obj.ad1}
                    },
                    {
                      text: obj.addressLine3,
                      // bold:true,
                      fontSize: 10,
                      style: 'blackFont',
                      absolutePosition: {x: 90, y: 144 + ((obj.ad2 === 0)?obj.ad2:obj.ad1+obj.ad2)}
                    },
                    {
                      text: obj.addressLine4,
                      // bold:true,
                      fontSize: 10,
                      style: 'blackFont',
                      absolutePosition: {x: 90, y: 156 + ((obj.ad3 === 0)?obj.ad3:obj.ad1+obj.ad2+obj.ad3)}
                    },
                    {
                      text: obj.addressLine5,
                      // bold:true,
                      fontSize: 10,
                      style: 'blackFont',
                      width: 120,
                      absolutePosition: {x: 90, y: 168 + ((obj.ad4 === 0)?obj.ad4:obj.ad1+obj.ad2+obj.ad3+obj.ad4)},
                      margin:[5,2]
                    },
                    {
                      text: obj.gqePostCode,
                      // bold:true,
                      fontSize: 10,
                      style: 'blackFont',
                      absolutePosition: {x: 90, y: 180 + ((obj.ad5 === 0)?obj.ad5:obj.ad1+obj.ad2+obj.ad3+obj.ad4+obj.ad5)}
                    },
                    {
                      text:this.pdfFooterTVLicense,
                      fontSize: 9,
                      style: ['lineStyle', 'blackFont'],
                      bold: true,
                      absolutePosition: {x: 80, y: 300}
                    }
                  ]
                },
                {
                  text: this.pdfTvLicenceNo,
                  margin: [8, 10, 0, 0],
                  style: 'whiteFont',
                  border: [false, false, true, false],
                  fillColor: '#205768'
                }],
              ['', {
                fillColor: '#205768',
                border: [false, false, true, false],
                margin: [10, 0, 0, 0],
                table: {
                  widths: [98],
                  heights: 12,

                  body: [
                    [{
                      text: obj.licenceNo,
                      style: 'fontWeight8',
                      margin: [0, 2, 0, 0],
                      border: [false, false, false, false],
                      fillColor: 'white'
                    }]
                  ]
                }
              }],
              ['', {
                text: this.pdfTvLicenceFee,
                style: 'whiteFont',
                margin: [8, 0, 0, 0],
                border: [false, false, true, false],
                fillColor: '#205768'
              }],
              ['', {
                fillColor: '#205768',
                border: [false, false, true, false],
                margin: [10, 0, 0, 0],
                table: {
                  widths: [98],
                  heights: 12,
                  body: [
                    [{
                      text: '£ '+obj.licenceFee,
                      style: 'fontWeight8',
                      margin: [0, 2, 0, 0],
                      border: [false, false, false, false],
                      fillColor: 'white'
                    }]
                  ]
                }
              }],
              ['', {
                text: this.pdfTvPayMethod,
                style: 'whiteFont',
                margin: [8, 0, 0, 0],
                border: [false, false, true, false],
                fillColor: '#205768'
              }],
              ['', {
                fillColor: '#205768',
                border: [false, false, true, false],
                margin: [10, 0, 0, 0],
                table: {
                  widths: [98],
                  heights: 12,
                  body: [
                    [{
                      text: obj.paymentMethod,
                      style: 'fontWeight8',
                      margin: [0, 1, 0, 0],
                      border: [false, false, false, false],
                      fillColor: 'white'
                    }]
                  ]
                }
              }],
              ['', {
                text: this.pdfTvValidUntil,
                style: 'whiteFont',
                margin: [8, 0, 0, 0],
                border: [false, false, true, false],
                fillColor: '#205768'
              }],
              ['', {
                fillColor: '#205768',
                margin: [10, 0, 0, 0],
                border: [false, false, true, false],
                table: {
                  widths: [98],
                  heights: 12,
                  body: [
                    [{
                      text: obj.validUntil,
                      style: 'fontWeight8',
                      margin: [0, 1, 0, 0],
                      border: [false, false, false, false],
                      fillColor: 'white'
                    }]
                  ]
                }
              }],
              ['', {
                text: this.pdfTvLicenceType,
                style: 'whiteFont',
                margin: [8, 0, 0, 0],
                border: [false, false, true, false],
                fillColor: '#205768'
              }],
              ['', {
                fillColor: '#205768',
                border: [false, false, true, false],
                margin: [10, 0, 0, 0],
                table: {
                  widths: [98],
                  heights: 12,
                  body: [
                    [{
                      text: obj.tvLicenceType,
                      style: 'fontWeight8',
                      margin: [0, 1, 0, 0],
                      border: [false, false, false, false],
                      fillColor: 'white'
                    }]
                  ]
                }
              }],
              ['', {
                text: this.pdfTvLicenceRecieve,
                style: 'whiteFont',
                margin: [8, 0, 0, 0],
                border: [false, false, true, false],
                fillColor: '#205768'
              }],
              ['', {
                fillColor: '#205768',
                margin: [10, 0, 19, 15],
                border: [false, false, true, true],
                table: {
                  widths: [98],
                  heights: 12,
                  border: [false, false, false, false],
                  body: [
                    [{
                      text: obj.recieveTvLicence,
                      style: 'fontWeight8',
                      margin: [0, 1, 0, 0],
                      border: [false, false, false, false],
                      fillColor: 'white'
                    }]
                  ]
                }
              }]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            }
          }
        },
        {
          style: 'boldLines',
          margin: [50, 10, 0, 0],
          align: 'center',
          text: this.pdfCommunicationsAct
        },

        {
          fillColor: '#efebef ',
          border: [false, false, true, false],
          margin: [35, 10, 0, 0],
          table: {
            widths: [445],
            heights: 20,
            body: [
              [{
                text: this.pdfTermsandConditionsTitle,
                style: 'termsStyle',
                border: [false, false, false, false],
                margin: [0, 5, 0, 0],
                fillColor: '#efebef'
              }]
            ]
          }
        },
        {
          border: [false, false, false, false],
          margin: [35, 0, 0, 0],
          table: {
            widths: [445],
            body: [
              [{
                fontSize: 7,
                margin: [0, 6, 0, 0],
                border: [false, false, false, false],
                align: 'center',
                bold: true,
                text: this.pdfTvLicenceAbout
              }],
              [{
                fontSize: 7,
                margin: [0, 6, 0, 0],
                border: [false, false, false, false],
                align: 'center',
                bold: true,
                text: this.pdfTermsandConditionsTitle1
              }],
              [{
                fontSize: 7,
                style: 'lineStyle',
                margin: [0, 6, 0, 0],
                border: [false, false, false, false],
                alignment: 'justify',
                text: this.pdfTermsandCondsTitle1MsgA
              }],
              [{
                fontSize: 7,
                margin: [0, -5, 0, 0],
                border: [false, false, false, false],
                alignment: 'justify',
                text: this.pdfTermsandCondsTitle1MsgB
              }],
              [{
                fontSize: 7,
                style: 'lineStyle',
                margin: [0, 6, 0, 0],
                border: [false, false, false, false],
                alignment: 'justify',
                text: this.pdfTermsandCondsTitle1MsgC
              }],
              [{
                fontSize: 7,
                margin: [0, 6, 0, 0],
                border: [false, false, false, false],
                bold: true,
                align: 'center',
                text: this.pdfTermsandConditionsTitle2
              }],
              [{
                fontSize: 7, margin: [0, 5, 0, 0], border: [false, false, false, false],
                ul: [
                  {text: this.pdfTermsandCondsTitle2MsgA},
                  {
                    margin: [0, 6, 0, 0],
                    text: this.pdfTermsandCondsTitle2MsgB
                  },
                  {
                    margin: [0, 6, 0, 0],
                    text: this.pdfTermsandCondsTitle2MsgC
                  }
                ]
              }],
              [{
                fontSize: 7,
                border: [false, false, false, false],
                margin: [0, 5, 0, 0],
                bold: true,
                align: 'center',
                text: this.pdfTermsandConditionsTitle3
              }],
              [{
                fontSize: 7, style: 'lineStyle', margin: [0, 6, 0, 0], border: [false, false, false, false],
                ul: [
                  {text: this.pdfTermsandCondsTitle3MsgA},
                  {
                    margin: [0, 6, 0, 0],
                    alignment: 'justify',
                    text: this.pdfTermsandCondsTitle3MsgB
                  }
                ]
              }],
              [{
                fontSize: 7,
                style: 'lineStyle',
                border: [false, false, false, false],
                margin: [0, 5, 0, 0],
                align: 'center',
                bold:true,
                text: this.pdfTermsandCondsTitle3MsgC
              }],

              [{
                fontSize: 7,
                border: [false, false, false, false],
                margin: [0, 5, 0, 0],
                alignment: 'justify',
                text: this.pdfTermsandCondsTitle3MsgD
              }],
              [{
                fontSize: 7,
                border: [false, false, false, false],
                margin: [0, 4, 0, 0],
                bold: true,
                text: this.pdfTermsandConditionsTitle4
              }],
              [{
                fontSize: 7,
                style: 'lineStyle',
                border: [false, false, false, false],
                margin: [0, 4, 0, 0],
                alignment: 'justify',
                text: this.pdfTermsandCondsTitle4MsgA
              }],
              [{
                fontSize: 7,
                style: 'lineStyle',
                border: [false, false, false, false],
                margin: [0, 4, 0, 0],
                alignment: 'justify',
                text: this.pdfTermsandCondsTitle4MsgB
              }]


            ]
          }
        }
      ],
      styles: {
        whiteFont: {
          color: 'white',
          bold: true,
          marginLeft: 10,
          fontSize: 10
        },
        boldLines: {
          fontSize: 8,
          bold: true
        },
        termsStyle: {
          fontSize: 10,
          bold: true
        },
        blackFont: {
          color: 'black'
        },
        lineStyle: {
          // lineHeight:1.2
        },
        fontWeight8: {
          fontSize: 10,
          color: 'black'
        }
      }
    }
  }
  createPdf(obj) {
    if(this.sharedService.getUSerLocalData('en')=='true'){
          this.setPdfLangEn();
          this.drawPage(obj);
          pdfMake.createPdf(this.docDefinition).download(this.filePdfname);
    }else{
          this.setPdfLangCy();
          this.drawPage(obj);
          pdfMake.createPdf(this.docDefinition).download(this.filePdfname);
    }
    // this.drawPage(obj);
    // pdfMake.createPdf(this.docDefinition).download('TVLicence.pdf');
  }
  print(obj) {
    if(this.sharedService.getUSerLocalData('en')=='true'){
      this.setPdfLangEn();
    }else{
      this.setPdfLangCy();
    }
    this.drawPage(obj);
    if(this.sharedService.getBrowser().toLowerCase().indexOf('safari') >= -1){
      pdfMake.createPdf(this.docDefinition).open();
    }else{
      pdfMake.createPdf(this.docDefinition).print();
    }
    // this.drawPage(obj);
    // pdfMake.createPdf(this.docDefinition).print();
  }
  drawBarcode(barcode) {
    this.barcodeDefinition = {
      defaultStyle: {
        font: 'customFont'
      },
      content: [
        {
          columns: [
            {
              width: 80,
              image: this.config.barCodeTVLicense()
            },
            {
              image: this.config.simplePlanLogo(),
              fit: [50, 50],
              absolutePosition: {x: 500, y: 40}
            }
          ]
        },
        {
          columns: [
            {
              margin: [0, 80, 0, 0],
              text: this.pdfPaypointBarCode,
              style: 'shortTextStyle'
            },
            {
              image: this.config.barCodePLogo(),
              fit: [40, 40],
              absolutePosition: {x: 500, y: 130}
            }
          ]
        },
        {
          columns: [
            {
              margin: [0, 30, 0, 30],
              text: this.pdfPaypointPara,
              fontSize: 10,
              bold: true
            }
          ]
        },
        {
          fillColor: '#205768',
          margin: [140, 0, 19, 15],
          //   border: [false, false, true, true],
          table: {
            body: [
              [{image: barcode, width: 185, height: 85, margin: [10, 10, 10, 10], fillColor: 'white'}]
            ]
          }
        },
      ],
      styles: {
        shortTextStyle: {
          color: '#205768',
          bold: true,
          fontSize: 14
        }
      }
    }
  }

  createBarCode(barcode) {
    if(this.sharedService.getUSerLocalData('en')=='true'){
         this.setBarCodeLangEn();
         this.drawBarcode(barcode);
         pdfMake.createPdf(this.barcodeDefinition).download('PaymentBarcode');
    }else{
         this.setBarCodeLangCy();
         this.drawBarcode(barcode);
         pdfMake.createPdf(this.barcodeDefinition).download('PaymentBarcode');
    }

  }
  printBarcode(barcode) {
    if(this.sharedService.getUSerLocalData('en')=='true'){
          this.setBarCodeLangEn();
          this.drawBarcode(barcode);
          pdfMake.createPdf(this.barcodeDefinition).print();
    }else{
        this.setBarCodeLangCy();
        this.drawBarcode(barcode);
        pdfMake.createPdf(this.barcodeDefinition).print();
    }

  }

  setPdfLangEn(){
    this.pdfTvLicence = this.pdfTranslate.translate.en.pdfTvLicence;
    this.pdfFooterTVLicense = this.pdfTranslate.translate.en.pdfFooterTVLicense;
    this.pdfTvLicenceNo = this.pdfTranslate.translate.en.pdfTvLicenceNo;
    this.pdfTvLicenceFee = this.pdfTranslate.translate.en.pdfTvLicenceFee;
    this.pdfTvPayMethod = this.pdfTranslate.translate.en.pdfTvPayMethod;
    this.pdfTvValidUntil = this.pdfTranslate.translate.en.pdfTvValidUntil;
    this.pdfTvLicenceType = this.pdfTranslate.translate.en.pdfTvLicenceType;
    this.pdfTvLicenceRecieve = this.pdfTranslate.translate.en.pdfTvLicenceRecieve;
    this.pdfCommunicationsAct = this.pdfTranslate.translate.en.pdfCommunicationsAct;
    this.pdfTermsandConditionsTitle = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle;
    this.pdfTvLicenceAbout = this.pdfTranslate.translate.en.pdfTvLicenceAbout;
    this.pdfTermsandConditionsTitle1 = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle1;
    this.pdfTermsandCondsTitle1MsgA = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle1MessageA;
    this.pdfTermsandCondsTitle1MsgB = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle1MessageB;
    this.pdfTermsandCondsTitle1MsgC = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle1MessageC;
    this.pdfTermsandConditionsTitle2 = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle2;
    this.pdfTermsandCondsTitle2MsgA = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle2MessageA;
    this.pdfTermsandCondsTitle2MsgB = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle2MessageB;
    this.pdfTermsandCondsTitle2MsgC = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle2MessageC;
    this.pdfTermsandConditionsTitle3 = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle3;
    this.pdfTermsandCondsTitle3MsgA = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle3MessageA;
    this.pdfTermsandCondsTitle3MsgB = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle3MessageB;
    this.pdfTermsandCondsTitle3MsgC = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle3MessageC;
    this.pdfTermsandCondsTitle3MsgD = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle3MessageD;
    this.pdfTermsandConditionsTitle4 = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle4;
    this.pdfTermsandCondsTitle4MsgA = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle4MessageA;
    this.pdfTermsandCondsTitle4MsgB = this.pdfTranslate.translate.en.pdfTermsandConditionsTitle4MessageB;
    this.filePdfname = this.pdfTranslate.translate.en.filePdfName;
  }
  setPdfLangCy(){
    this.pdfTvLicence = this.pdfTranslate.translate.cy.pdfTvLicence;
    this.pdfFooterTVLicense = this.pdfTranslate.translate.cy.pdfFooterTVLicense;
    this.pdfTvLicenceNo = this.pdfTranslate.translate.cy.pdfTvLicenceNo;
    this.pdfTvLicenceFee = this.pdfTranslate.translate.cy.pdfTvLicenceFee;
    this.pdfTvPayMethod = this.pdfTranslate.translate.cy.pdfTvPayMethod;
    this.pdfTvValidUntil = this.pdfTranslate.translate.cy.pdfTvValidUntil;
    this.pdfTvLicenceType = this.pdfTranslate.translate.cy.pdfTvLicenceType;
    this.pdfTvLicenceRecieve = this.pdfTranslate.translate.cy.pdfTvLicenceRecieve;
    this.pdfCommunicationsAct = this.pdfTranslate.translate.cy.pdfCommunicationsAct;
    this.pdfTermsandConditionsTitle = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle;
    this.pdfTvLicenceAbout = this.pdfTranslate.translate.cy.pdfTvLicenceAbout;
    this.pdfTermsandConditionsTitle1 = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle1;
    this.pdfTermsandCondsTitle1MsgA = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle1MessageA;
    this.pdfTermsandCondsTitle1MsgB = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle1MessageB;
    this.pdfTermsandCondsTitle1MsgC = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle1MessageC;
    this.pdfTermsandConditionsTitle2 = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle2;
    this.pdfTermsandCondsTitle2MsgA = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle2MessageA;
    this.pdfTermsandCondsTitle2MsgB = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle2MessageB;
    this.pdfTermsandCondsTitle2MsgC = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle2MessageC;
    this.pdfTermsandConditionsTitle3 = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle3;
    this.pdfTermsandCondsTitle3MsgA = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle3MessageA;
    this.pdfTermsandCondsTitle3MsgB = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle3MessageB;
    this.pdfTermsandCondsTitle3MsgC = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle3MessageC;
    this.pdfTermsandCondsTitle3MsgD = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle3MessageD;
    this.pdfTermsandConditionsTitle4 = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle4;
    this.pdfTermsandCondsTitle4MsgA = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle4MessageA;
    this.pdfTermsandCondsTitle4MsgB = this.pdfTranslate.translate.cy.pdfTermsandConditionsTitle4MessageB;
    this.filePdfname = this.pdfTranslate.translate.cy.filePdfName;
  }

   setBarCodeLangEn(){
      this.pdfPaypointBarCode = this.pdfTranslate.translateBar.english.pdfPayPointBarCode;
      this.pdfPaypointPara = this.pdfTranslate.translateBar.english.pdfPayPointPara;
   }
  setBarCodeLangCy(){
      this.pdfPaypointBarCode = this.pdfTranslate.translateBar.welsh.pdfPayPointBarCode;
      this.pdfPaypointPara = this.pdfTranslate.translateBar.welsh.pdfPayPointPara;
  }
  ngOnInit(){

  }
}
