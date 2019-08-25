import { User } from './../user_model/user';
import { Role } from './../user_model/role';

import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  myForm: FormGroup;

  successMessage: string = '';
  // disabled: boolean = false; // slide toggle admin
  // @Input() checked: boolean; // slide toggle admin
  // role: Role;
  // admin: Role.Admin;
  // user: User['role']
  color = 'warn';

  constructor(
    private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator),
      role: new FormControl({value: false, disabled: false}, Validators.required)
    });
    this.myForm.controls.password.valueChanges
      .subscribe(
        x => this.myForm.controls.cnfpass.updateValueAndValidity()
      );
  }
  // convenience getter for easy access to form fields
  get f() { return this.myForm.controls; }
  get _role() {
    return this.myForm.get('role');
  }


  // onChange() {
  //   this._role.setValue('admin')
  // //   if (this.checked === false) {
  // //     this._role.setValue('user')
  // //  } else {this._role.setValue('admin') }
  // }



  ngOnInit() {

  }

  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

  // send the form to the user class throught User interface
  register() {
    console.log(this.myForm.value);

    if (this.myForm.valid) {
      this._myservice.submitRegister(this.myForm.value)
        .subscribe(
          data => this.successMessage = 'Registration Successfully',
          error => this.successMessage = 'SOme error'
        );
    }
  }




  movetologin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }







}
