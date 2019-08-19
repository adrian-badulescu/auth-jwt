import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainDeskComponent } from './main-desk/main-desk.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
{path: '', redirectTo: 'main', pathMatch: 'full'},
{
  path: 'main', component: MainDeskComponent, children:
    [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
},
{path: 'dash' , component: UserDashboardComponent},
{path: 'admin',
 loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
 data: {
   allowedRoles: ['admin']
 }
}
];





@NgModule({
  imports:
  [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
