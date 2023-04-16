import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this._authService.isAuthenticated()){
        this._router.navigate(['/auth/login']);
        return false;
      }
      let role = route.data['role'] as string;
      if(this._authService.hasRole(role)){
        return true;
      }
      Swal.fire(
        'Acceso denegado',
        'No tienes los permisos necesarios',
        'warning'
      );
      if(role == 'ROLE_ADMIN'){
        this._router.navigate(['/admin/dashboard']);
      }else{
        this._router.navigate(['/']);
      }
    return false;
  }
  
}
