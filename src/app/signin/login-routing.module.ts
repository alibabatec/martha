import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../signin/login.component';
import { LoginStepSecondComponent } from './loginstepsecond/loginstepsecond.component';

export class RegisterationRoutingModule { }


const loginRoutes: Routes = [
     {path:'',component:LoginComponent},  
     {path:'loginstepsecond',component:LoginStepSecondComponent}      
];
export const LoginRouting = RouterModule.forChild(loginRoutes);