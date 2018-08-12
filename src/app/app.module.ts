import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MomentModule} from "angular2-moment";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {SharedService} from "./services/shared.service";
import {AuthguardService} from "./services/authguard.service";
import {AuthService} from "./services/auth.service";
import {SharedModule} from "./shared/shared.module";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {WebService} from './services/web.service';
import {ProcedureService} from './services/procedure.service';
import {Angulartics2Module} from "angulartics2";
//import {Angulartics2GoogleAnalytics} from "angulartics2/ga";
import { CookieService } from 'ngx-cookie-service';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
// require for AOT compilation
export function HttpLoadFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import {AppComponent} from './app.component';
import {routing} from './app-routing';
import {HeaderComponent} from './common/header/header.component';
import {FooterComponent} from './common/footer/footer.component';
import {AccordionModule} from './Directives/accordion.module';
import {DialogComponent} from './dialog/dialog.component';
//import {ForgotlicenceComponent} from './forgotlicence/forgotlicence.component';
//import {OffboardComponent} from './offboard/offboard.component';
//import {YourlicenceComponent} from './yourlicence/yourlicence.component';
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {NgIdleKeepaliveModule} from "@ng-idle/keepalive";
import {from} from "rxjs/observable/from";
import {TimeoutComponent} from './timeout/timeout.component';
import {ExpiredComponent} from './expired/expired.component';
import {PdfService} from "./services/pdf.service";
import {ConfigService} from "./services/config.service";
import {PdftranslateService} from "./services/pdftranslate.service";
import {PaymentauthService} from './services/paymentauth.service';
import {HideDirective} from './shared/hide.directive';
import {Notfound404Component} from './notfound404/notfound404.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DialogComponent,    
    TimeoutComponent,
    ExpiredComponent,
    Notfound404Component
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule,
    FormsModule,
    routing,
    AccordionModule,
    // translate module method using for translate the language
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoadFactory,
        deps: [HttpClient]
      }
    }),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    NoopAnimationsModule
    //,Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  providers: [SharedService, WebService, PaymentauthService, ProcedureService, AuthguardService, AuthService, ConfigService, PdfService, PdftranslateService, CookieService, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
