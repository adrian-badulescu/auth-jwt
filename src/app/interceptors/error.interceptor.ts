import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MyserviceService } from './../myservice.service';

@Injectable({
    providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {

    constructor(private myService: MyserviceService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if([401, 403].indexOf(err.status) !== -1){
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.myService.logout();
                location.reload(true);
            }
        
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }











}