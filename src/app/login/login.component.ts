import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  get f() { return this.loginForm.controls; }
  login() {
    // console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this._myservice.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          data => {
            // console.log(data);
            // localStorage.setItem('token', JSON.stringify(data));
            localStorage.setItem('currentUser', JSON.stringify(data));
            this._router.navigate(['/dash']);
          },
          error => { }
        );
    }
  }

  movetoregister() {
    this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
  }





}
