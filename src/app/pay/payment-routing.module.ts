import {Routes, RouterModule} from '@angular/router';
import {PaybycardComponent} from './paybycard/paybycard.component';
import {BarcodeComponent} from "./paypoint/barcode.component";
import {ScheduleComponent} from './schedule/schedule.component';
import {CallbackComponent} from "./callback/callback.component";
import {PaymentauthService} from "../services/paymentauth.service";

const payRoutes: Routes = [
  {path: '', component: PaybycardComponent},
  {path: 'paypoint', component: BarcodeComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'callback', component: CallbackComponent, canActivate: [PaymentauthService]}
];

export const PaymentRouting = RouterModule.forChild(payRoutes);
