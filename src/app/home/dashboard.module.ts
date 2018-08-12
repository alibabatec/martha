import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../home/dashboard.component';

import { DashboardRouting } from '../home/dashboard-routing.module';
import { AccordionModule } from '../Directives/accordion.module';

// import ngx-translate and http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {SharedModule} from "../shared/shared.module";

// require for AOT compilation
export function HttpLoadFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    AccordionModule,
    SharedModule,
    TranslateModule.forChild({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoadFactory,
        deps:[HttpClient]
      }
    })
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
