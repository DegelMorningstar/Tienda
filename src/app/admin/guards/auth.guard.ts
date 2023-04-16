import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._authService.isAuthenticated()){
        if(this.isTokenExpired()){
          this._authService.logout();
          this._router.navigate(['/auth/login']);
          return false;
        }
        return true;
      }
      this._router.navigate(['/auth/login']);
    return false;
  }

  isTokenExpired(): boolean {
    let token = this._authService.token;
    let payload = this._authService.obtenerDatosToken(token);
    if(payload != null){
      let now = new Date().getTime() / 1000;
      if( payload.exp < now ){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  
}
