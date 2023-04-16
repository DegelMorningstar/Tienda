import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexClientesComponent } from './components/clientes/index-clientes/index-clientes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard',pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard,AdminGuard],data: {role: 'ROLE_ADMIN'}},
      { path: 'clientes', component: IndexClientesComponent,canActivate: [AuthGuard,AdminGuard],data: {role: 'ROLE_ADMIN'}},
      { path: 'productos', component: IndexProductoComponent,canActivate: [AuthGuard,AdminGuard],data: {role: 'ROLE_ADMIN'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
