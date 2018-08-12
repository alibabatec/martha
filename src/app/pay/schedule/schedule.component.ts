import {Component, OnInit, Input, ElementRef, Renderer2} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {WebService} from '../../services/web.service';
import {ProcedureService} from '../../services/procedure.service';
import {SharedService} from "../../services/shared.service";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

// public properties  
  imgSrc: String = 'assets/img/up_arrow.png';
  licenceNo;
  totalPaidtoDate;
  arrearsBy;
  tableData = [];
  tableDataSeceond = [];
  show: boolean;
  noData: boolean;
  noDataA: boolean;
  isShow: boolean = true;
  accountId;
  multipleId;
  startMonth;
  expiryMonth;
  constructor(private sharedService: SharedService,
              private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private webService: WebService,
              private element: ElementRef,
              private render: Renderer2,
              private procedure: ProcedureService) {

             this.show = false;
             this.noData = false;
             this.noDataA = false;

  }

  showData() {
  
  // get the user data after getting the response from server  
    const data = this.sharedService.getUserData();
    this.accountId = this.sharedService.extractData(data,"GQE_ACCOUNT_ID").formattedValue;
    this.multipleId = this.sharedService.extractData(data,"GQE_MULTIPLE_ID").formattedValue;
    const formData = {
      "user": "SPPPORTAL",
      "keyValuePairs": {
        "#ACCOUNT_ID": this.accountId,
        "#MULTIPLE_ID": this.multipleId
      }
    }
    this.procedure.getScheduleData(formData).subscribe(
      (res) => {
        this.startMonth = this.sharedService.extractData(res.fields, "GQE_LICENCE_COVER_START_MONTH_YEAR").formattedValue;
        this.expiryMonth = this.sharedService.extractData(res.fields, "GQE_LICENCE_EXPIRY_MONTH_YEAR").formattedValue;
        if(this.startMonth === "" || this.expiryMonth === ""){
          this.isShow = false;
        }else{
          this.isShow = true;
        }
        const data = res.tables[0].tableRows;
        if(data.length>0){
          this.noData = true;
        }else{
          this.noData = false;
        }
        data.forEach(element => {
          const col = (element.columns);
          this.tableData.push(col);
          if (this.tableData.length > 0) {
            this.show = true;
          }
        });
          
        const secondData = res.tables[1].tableRows;
        if(secondData.length>0){
            this.noDataA = true
        }else{
            this.noDataA = false;
        }
        secondData.forEach(elmnt => {
          const secondCol = (elmnt.columns);
          this.tableDataSeceond.push(secondCol);
          if (this.tableDataSeceond.length > 0) {
            this.show = true;
          }
        })
      }
    )
  }


  ngOnInit() {

    const data = this.sharedService.getUserData();
    this.licenceNo = this.sharedService.extractData(data, "GQE_LICENCE_NO").formattedValue;
    this.totalPaidtoDate = this.sharedService.extractData(data, "GQE_PAID_TO_DATE").formattedValue;
    this.arrearsBy = this.sharedService.extractData(data, "GQE_ARREARS_AMOUNT").formattedValue;
    this.showData();
  }
 
// to set the class  
  clsPropety(){
    let ngClass;
    if(this.sharedService.getUSerLocalData('en')=='true')
      ngClass = "tbl--eng";
    else
      ngClass = "tbl--welsh";
      return ngClass;
    
  }

}
