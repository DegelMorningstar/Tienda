import { Component, OnInit } from '@angular/core';
import { IUsuario, Usuario } from 'src/app/shared/models/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  usuario: IUsuario;

  constructor(private _authService: AuthService, private _router: Router) 
  {
    this.usuario = {
      id: 0,
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      verificado: false,
      createAt: '',
      updateAt: '',
      roles: []
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

  login() {
    if (this.usuario.email == '' || this.usuario.password == '') {
      Swal.fire('Advertencia', 'No dejes los campos en blanco', 'warning');
    } else {
      this._authService.login(this.usuario).subscribe({
        next: (response) => {
          this._authService.guardarUsuario(response.access_token);
          this._authService.guardarToken(response.access_token);
          let usuario = this._authService.usuario!;
          if (usuario.authorities.includes('ROLE_ADMIN')) {
            this._router.navigate(['/admin']);
            this.Toast.fire({
              icon: 'success',
              title: 'Bienvenido ' + usuario.nombre_usuario,
            });
          } else {
            this._router.navigate(['/']);
            this.Toast.fire({
              icon: 'success',
              title: 'Bienvenido ' + usuario.nombre_usuario,
            });
          }
        },
        error: (err) => {
          if (err.status == 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Credenciales incorrectas',
            });
          }
        },
      });
    }
  }
}
