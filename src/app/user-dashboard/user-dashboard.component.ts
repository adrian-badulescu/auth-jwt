import { User } from './../user_model/user';
import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {
  
  username: any;
  
  constructor(private myService: MyserviceService, private _router: Router) {
    this.myService.getUserName()
      .subscribe(
        data => this.username = data,
        error => this._router.navigate(['/main/login'])
        );
      
  }

  ngOnInit() {
    
  }

  logout() {
    // localStorage.removeItem('token');
    localStorage.removeItem('currentUser')
    this._router.navigate(['/main/login']);
  }
}
