import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/pages/login.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { DetailComponent } from "./modules/dashboard/pages/details/detail.component";
import { AuthGuard } from './core/guards/auth.guard';
import { LogGuard } from './core/guards/log.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LogGuard],
    component: LoginComponent,
  },
  {
    path: 'dashboard-movies',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'dashboard-movies/detail/:id',
    canActivate: [AuthGuard],
    component: DetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
