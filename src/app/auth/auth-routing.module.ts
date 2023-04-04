import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ValidarEmailComponent } from './components/validar-email/validar-email.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '**', redirectTo: 'login'},
      { path: 'login', component: LoginComponent},
      { path: 'registro', component: RegistroComponent},
      { path: 'forgot-password', component: ForgotPasswordComponent},
      { path: 'validar-email', component: ValidarEmailComponent},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
