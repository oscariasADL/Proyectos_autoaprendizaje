import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//Page base
import { PagesComponent } from './pages.component';

//Pages account
import { PerfilComponent } from './perfil/perfil.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

//Pages dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//Mantenainces
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

//Guardian de ruta
import { AuthGuard } from '../guards/auth.guard';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [

      //Dasboard
      { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progreso'} },
      { path: 'graficas', component: Grafica1Component, data: { title: 'Gráficas'} },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS'} },

      //Mantenainces
      { path: 'usuarios', component: UsuariosComponent, data: { title: 'Usuarios' } },
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Usuarios' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Usuarios' } },

      //Pages account
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Cuenta'} },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de usuario' } },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
