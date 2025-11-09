import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

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
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';



const childRoutes =  [
  //Dasboard
      { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progreso'} },
      { path: 'graficas', component: Grafica1Component, data: { title: 'Gráficas'} },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS'} },

      //Mantenainces
      { path: 'usuarios', component: UsuariosComponent, data: { title: 'Usuarios' } },
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Matenimiento de Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Matenimiento de Medicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Matenimiento de Medicos' }},

      //Pages account
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Cuenta'} },
      { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' }},
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de usuario' } },
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule { }
