import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class AppModule {}

@NgModule({})
export class ShellAppModule {
  static forChild(): ModuleWithProviders<AppModule> {
    return {
      ngModule: AppModule,
      providers: []
    };
  }
}
