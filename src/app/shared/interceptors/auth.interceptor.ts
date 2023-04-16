import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( e => {
        if (e.status == 401) {
          if(this._authService.isAuthenticated()){
            this._authService.logout();
          }
          this._router.navigate(['/auth/login']);
        }
        if (e.status == 403) {
          Swal.fire(
            'Acceso denegado',
            'No tienes los permisos necesarios',
            'warning'
          );
          if (this._authService.usuario!.authorities.includes('ROLE_ADMIN')) {
            this._router.navigate(['/admin/dashboard']);
          } else {
            this._router.navigate(['/home']);
          }
        }
        return throwError(() => e)
      })
    );
  }
}
