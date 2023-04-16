import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  constructor(
    private _router:Router,
    private _authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this._authService.logout();
    //TODO cambiar redirect a home
    this._router.navigate(['/auth/login']).then(() => {
      this.Toast.fire({
        icon: 'success',
        title: 'Se cerro la sesión correctamente'
      })
      //window.location.reload();
    });;
  }
}
