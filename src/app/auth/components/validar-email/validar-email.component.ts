import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validar-email',
  templateUrl: './validar-email.component.html',
  styleUrls: ['./validar-email.component.css']
})
export class ValidarEmailComponent implements OnInit {
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

  verificationToken:string = '';
  tokenValido:boolean = false;
  tokenExpirado:boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      if (this._authService.usuario!.authorities.includes('ROLE_ADMIN')) {
        this._router.navigate(['/admin']);
      } else {
        this._router.navigate(['/']);
      }
    }
    this._route.params.subscribe(
      params => {
        this.verificationToken = params['token'];
        if(this.verificationToken == null || this.verificationToken == undefined || this.verificationToken == ''){
          this._router.navigate(['/auth/registro']);
          this.Toast.fire({
            icon: 'warning',
            title: 'Ups! Parece que no tienes un token de verificación, por favor registrate o inicia sesión',
          });
        }
        //todo loading state true
        this._authService.validarEmail(this.verificationToken).subscribe(
          {
            next: (response) => {
              if(response.mensaje === 'Email verificado con exito. Ahora puedes iniciar sesión'){
                this.tokenValido = true;
              }else{
                this.tokenValido = false;
              }
            },
            error: (err) => {
              if(err.error.mensaje === 'Token expirado'){
                this.tokenExpirado = true;
              }else{
                this._router.navigate(['/auth/registro']);
                this.Toast.fire({
                  icon: 'warning',
                  title: 'Ups! '+err.error.mensaje,
                });
              }
            }
          }
        )
      }
    )

  }

  reenviarEmail(){
    if(this.verificationToken != null || this.verificationToken != undefined || this.verificationToken != ''){
      this._authService.reenviarEmail(this.verificationToken).subscribe(
        {
          next: (response) => {
            Swal.fire('Exito!', response.mensaje, 'success');
            this._router.navigate(['/']);
          },
          error: (err) => {
            Swal.fire('Ups, algo salio mal', err.error.mensaje, 'error');
            this._router.navigate(['/auth/registro']);
          }
        }
      )
    }
  }

}
