import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { authInterceptorProviders } from './core/interceptors/http.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './modules/login/pages/login.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { DetailComponent } from "./modules/dashboard/pages/details/detail.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
