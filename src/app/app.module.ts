
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainDeskComponent } from './main-desk/main-desk.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { MyserviceService } from './myservice.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainDeskComponent,
    RegisterComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,  ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: null,
        whitelistedDomains: [null],
        blacklistedRoutes: [null]
      }
    })
  ],
  providers: [
    MyserviceService,
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  //   {
  //     provide: MAT_RADIO_DEFAULT_OPTIONS,
  //     useValue: { color: 'accent' },
  // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
