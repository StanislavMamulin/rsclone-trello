import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { NetworkRequest } from 'src/app/shared/models/network.model';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}
  
  intercept(req: HttpRequest<NetworkRequest>, next: HttpHandler): Observable<HttpEvent<NetworkRequest>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        headers: req.headers.set('x-access-token', this.auth.token as string),
      });

      return next.handle(req)
        .pipe(
          catchError(error => {
            if (error.statusCode === 401) {
              this.auth.logout();
              this.router.navigate(['/api/login']);
            }
            return throwError(error);
          }),
        );
    }

    return next.handle(req);
    
  }
}