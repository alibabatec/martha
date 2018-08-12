import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '../home/dashboard.component';

const dashboardRoutes: Routes = [
  {path: '', component: DashboardComponent}

];

export const DashboardRouting = RouterModule.forChild(dashboardRoutes);
