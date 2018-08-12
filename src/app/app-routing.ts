import {Routes, RouterModule} from '@angular/router';
import {AuthguardService} from "./services/authguard.service";
import {ExpiredComponent} from "./expired/expired.component";
import {Notfound404Component} from "./notfound404/notfound404.component";

const appRoutes: Routes = [
  {path: '', loadChildren: './signin/login.module#LoginModule'},
  {path: 'signin', loadChildren: './signin/login.module#LoginModule'},
  {path: 'registeration', loadChildren: './registeration/registeration.module#RegisterationModule'},      
  {path: 'expired', component: ExpiredComponent},  
  {path: '**', component: Notfound404Component}
];

// export the property for accessing to anywhere across all files
export const routing = RouterModule.forRoot(appRoutes);
