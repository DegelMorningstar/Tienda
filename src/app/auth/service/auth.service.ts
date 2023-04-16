import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { payload } from 'src/app/shared/models/data';
import { LoginResponse } from 'src/app/shared/models/response';
import { IUsuario } from 'src/app/shared/models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario : payload | null = null;
  private _token: string | null = null;

  authEndpoint = environment.authEndPoint;
  urlEndpoint = environment.urlEndPoint;
  credenciales = btoa(environment.CLIENT_KEY+':'+environment.SECRET_KEY);
  headers = new HttpHeaders(
    {'Content-Type':'application/x-www-form-urlencoded','Authorization':'Basic '+this.credenciales}
  );
  constructor(
    private _http:HttpClient
  ) { 
  }

  public get usuario(): payload | null {
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as payload;
      return this._usuario;
    }
    return null;
  }
  public get token(): string | null {
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token')!;
      return this._token;
    }
    return null;

  }

  hasRole(role: string): boolean {
    if (this.usuario?.authorities.includes(role)) {
      return true;
    }
    return false;
  }

  obtenerDatosToken(access_token: string | null): payload | null{
    if(access_token != null){
      return JSON.parse(atob(access_token.split(".")[1]));
    }else{
      return null;
    }
  }
  guardarUsuario(access_token: string | null) {
    let payload = this.obtenerDatosToken(access_token);
    if(payload != null){
      this._usuario = {
        email_usuario: payload.email_usuario, 
        user_name: payload.user_name,
        scope: payload.scope,
        exp: payload.exp,
        nombre_usuario: payload.nombre_usuario,
        authorities: payload.authorities,
        jti: payload.jti,
        client_id: payload.client_id
      }
      sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
    }
  }
  guardarToken(access_token: string | null) {
    if(access_token != null){
      this._token = access_token;
      sessionStorage.setItem('token',access_token);
    }
  }
  login(usuario:IUsuario):Observable<LoginResponse>{

    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.email);
    params.set('password',usuario.password);

    return this._http.post<LoginResponse>(
      this.authEndpoint,
      params.toString(),
      {headers:this.headers}
      );

  }
  registro(usuario:IUsuario):Observable<any>{
    return this._http.post<any>(
      this.urlEndpoint+'/registro',
      usuario
      );
  }
  validarEmail(token:string):Observable<any>{
    return this._http.get<any>(
      this.urlEndpoint+'/registro/verifyEmail?token='+token
      );
  }
  reenviarEmail(token:string):Observable<any>{
    return this._http.get<any>(
      this.urlEndpoint+'/registro/resend-verification-token?token='+token
      );
  }
  logout(){
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
  isAuthenticated():boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.nombre_usuario && payload.nombre_usuario.length > 0){
      return true;
    }
    return false;
  }
}
