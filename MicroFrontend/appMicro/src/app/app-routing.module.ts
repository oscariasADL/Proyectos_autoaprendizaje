import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppPreloadStrategy } from '@app/app-preload-strategy';
import { ROOT_ROUTES } from './app.routing';
import { ShellAppModule } from 'projects/bavv-mb-frontend-shell/src/app/app.module';

@NgModule({
  imports: [
    RouterModule.forRoot(ROOT_ROUTES, {
      preloadingStrategy: AppPreloadStrategy
    }),
    ShellAppModule.forChild()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
