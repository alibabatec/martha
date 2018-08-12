import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginComponent} from '../signin/login.component';

//===============payment module=================//
import {LoginRouting} from './login-routing.module';

// import ngx-translate and http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { LoginStepSecondComponent } from './loginstepsecond/loginstepsecond.component';

// require for AOT compilation
export function HttpLoadFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRouting,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoadFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [LoginComponent,LoginStepSecondComponent]
})
export class LoginModule {
}
