import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterationComponent } from '../registeration/registeration.component';
import { RegisterationSetPasswordComponent } from './setpassword/registerationsetpassword.component';
import {OtpComponent} from './otp/otp.component';
import {RegistrationCompleteComponent} from './registrationcomplete/registrationcomplete.component';

export class RegisterationRoutingModule { }

const RegisterRoutes: Routes = [
     {path:'',component:RegisterationComponent},
     {path:'credentials',component:RegisterationSetPasswordComponent},
     {path:'otp',component:OtpComponent},
     {path:'success',component:RegistrationCompleteComponent},

];
export const RegisterRouting = RouterModule.forChild(RegisterRoutes);
