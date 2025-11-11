import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@commons/guards/auth.guard';
import { RouterGuard } from '@commons/guards/router.guard';

const routes: Routes = [
  {
    path: 'remotes',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
    canActivateChild: [RouterGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
