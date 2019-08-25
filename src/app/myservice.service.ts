import { Role } from './user_model/role';
import { User } from './user_model/user';
import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
// import { Role}


@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  user: User;
  // role: Role;
  admin: Role.Admin;
  _user: Role.User;
  role: User['role'];

  @Input() checked: boolean; // slide toggle admin

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

  submitRegister(user: User) {
    if (this.checked === false) {
      this.role = this._user;
    } else { this.role = this.admin;}
    return this.http.post('http://localhost:3000/users/register', user, {
      observe: 'body'
    });
  }
  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/users/authenticate', { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        // console.log(username)

        return user;
      }));
  }

  getUserName() {
    return this.http.get('http://localhost:3000/users/current', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    // get token from local storage or state management
    const token = localStorage.getItem('currentUser');

    // decode token to read the payload details
    const decodeToken = this.jwtHelperService.decodeToken(token);

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodeToken) {
      // console.log('Invalid token');
      return false;
    }

    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(decodeToken['User']);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }














}
