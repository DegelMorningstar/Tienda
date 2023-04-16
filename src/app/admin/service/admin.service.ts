import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { listaUsuariosResponse } from 'src/app/shared/models/response';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private _http: HttpClient,
  ) {}

  private urlEndPoint = environment.urlEndPoint;

  listar_clientes_tienda(): Observable<listaUsuariosResponse> {
    return this._http
      .get<listaUsuariosResponse>(this.urlEndPoint + 'clientes');
  }
}
