import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RegisterationComponent} from '../registeration/registeration.component';

import { RegisterRouting } from './registeration-routing.module';
import {NgxMaskModule} from 'ngx-mask'


// import ngx-translate and http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RegisterationSetPasswordComponent } from './setpassword/registerationsetpassword.component';
import { OtpComponent } from './otp/otp.component';
import { RegistrationCompleteComponent } from './registrationcomplete/registrationcomplete.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
// require for AOT compilation
export function HttpLoadFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    RegisterRouting,
    MatDatepickerModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoadFactory,
        deps: [HttpClient]
      }
    })
    // ,
    // OwlDateTimeModule, 
    // OwlNativeDateTimeModule,
  ],
  declarations: [RegisterationComponent, RegisterationSetPasswordComponent, OtpComponent, RegistrationCompleteComponent]
})
export class RegisterationModule { }
