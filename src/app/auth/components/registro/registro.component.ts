import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/shared/models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: IUsuario;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this.usuario = {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
    }
   }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      if (this._authService.usuario!.authorities.includes('ROLE_ADMIN')) {
        this._router.navigate(['/admin']);
      } else {
        this._router.navigate(['/']);
      }
    }
  }

  registrar() {
    if (this.usuario.nombre == '' || this.usuario.apellidos == '' || this.usuario.email == '' || this.usuario.password == '') {
      Swal.fire('Advertencia', 'No dejes los campos en blanco', 'warning');
    } else {
      this._authService.registro(this.usuario).subscribe({
        next: (response) => {
          Swal.fire('Exito!', 'Usuario registrado con éxito! \n Revisa tu email para terminar tu registro.', 'success');
          this._router.navigate(['/']);
        },
        error: (err) => {
          if (err.status == 400) {
            Swal.fire('Ups!', 'El correo ya esta registrado, intenta de nuevo.', 'error');
          }
        },
      });
    }
  }

}
