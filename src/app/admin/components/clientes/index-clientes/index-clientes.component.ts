import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';
import { Usuario } from 'src/app/shared/models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-clientes',
  templateUrl: './index-clientes.component.html',
  styleUrls: ['./index-clientes.component.css']
})
export class IndexClientesComponent implements OnInit {
  
  public usuarios :Array<Usuario>= [];

  constructor(
    private _adminService:AdminService
  ) { }

  ngOnInit(): void {
    this._adminService.listar_clientes_tienda().subscribe(
      {
        next: (res) => {
          console.log(res.mensaje);
          if(res.estatus == 200){
          this.usuarios = res.resultado;
          }else{
          this.usuarios = [];
        }
        }
      }
    )
  }

}
