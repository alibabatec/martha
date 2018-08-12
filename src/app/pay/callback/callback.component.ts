import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProcedureService} from "../../services/procedure.service";
import {SharedService} from "../../services/shared.service";
import {DatePipe} from "@angular/common";
import * as crypto from 'crypto-js';
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  companyId;
  branch;
  accountNo;
  multiple;
  isValid = true;
  success = true;

  constructor(private spinnerService: Ng4LoadingSpinnerService, private router: Router, private activatedRoute: ActivatedRoute, private procedureService: ProcedureService, private sharedService: SharedService, private dateTime: DatePipe) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        if (params.valid === true || params.valid === 'true') {
          this.success = true;
          this.companyId = this.sharedService.extractData(this.sharedService.getUserData(), "GQE_COMPANY_ID").formattedValue;
          this.branch = this.sharedService.extractData(this.sharedService.getUserData(), "GQE_BRANCH_ID").formattedValue;
          this.accountNo = this.sharedService.extractData(this.sharedService.getUserData(), "GQE_ACCOUNT_ID").formattedValue;
          this.multiple = this.sharedService.extractData(this.sharedService.getUserData(), "GQE_MULTIPLE_ID").formattedValue;
          const date = this.dateTime.transform(new Date(), 'yyyyMMdd');
          const data = {
            "payment": {
              "account": {
                "company": this.companyId,
                "branch": this.branch,
                "accountNumber": this.accountNo,
                "multiple": this.multiple
              },
              "paymentDate": date,
              "paymentAmount": params.amount,
              "paymentReference": params.auth_code,
              "transType": "WPP"
            }
          };

          // If this payment has already been updated, avoid subsequent calls (In case user hits refresh etc)
          if (localStorage.getItem('pd')) {
            return;
          }

          this.procedureService.paymentAcknowledge(JSON.stringify(data)).subscribe(
            (res) => {
              localStorage.setItem('pd', 'true');
              if (res.toUpperCase() === "ACCEPTED") {
                this.isValid = true;
              } else {
                this.isValid = false;
              }
            },
            (err) => {
              this.isValid = false;
              console.log('server is not responding...')
            }
          )
        } else {
          this.isValid = false;
          this.success = false;
        }
      }
    );
    this.refreshData();
  }

  refreshData() {
    const data = this.sharedService.getUserData();
    const formData = {
      "user": "SPPPORTAL",
      "keyValuePairs":
        {
          "#LICENCE_NO": this.sharedService.extractData(data, "GQE_LICENCE_NO").formattedValue,
          "#SURNAME": localStorage.getItem('lastName'),
          "#POSTCODE": this.sharedService.extractData(data, "GQE_POSTCODE").formattedValue
        }
    };

    this.procedureService.login(formData).subscribe(
      (res) => {
        this.sharedService.setUserData(res.fields);
        this.spinnerService.hide();
      },
      //error => this.errorMessage = error
    );
  }

  redirect(url) {
    this.router.navigate([url]);
  }

}
