import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarcodeComponent} from "./paypoint/barcode.component";
import {PaybycardComponent} from './paybycard/paybycard.component';
import {PaymentRouting} from './payment-routing.module';
import {ScheduleComponent} from './schedule/schedule.component';
import {AccordionModule} from '../Directives/accordion.module';
import {CallbackComponent} from './callback/callback.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import { DatePipe } from '@angular/common';
// import ngx-translate and http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {FocusDirective} from "./focus.directive";


// require for AOT compilation
export function HttpLoadFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    PaymentRouting,
    AccordionModule,
    SharedModule,
    FormsModule,
     TranslateModule.forChild({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoadFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers:[DatePipe],
  declarations: [PaybycardComponent,BarcodeComponent, ScheduleComponent, CallbackComponent, FocusDirective]
})
export class PaymentModule {
}
