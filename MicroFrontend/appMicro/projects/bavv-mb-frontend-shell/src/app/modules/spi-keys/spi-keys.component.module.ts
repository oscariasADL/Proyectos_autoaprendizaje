import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpiKeysMFComponent } from './spi-keys.component';
import { SPI_KEYS_ROUTES } from './spi-keys.component.routes';
import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';

@NgModule({
  imports: [
    RouterModule.forChild(SPI_KEYS_ROUTES),

    ModuleFederationToolsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [SpiKeysMFComponent],
  providers: []
})
export class SPIKeysMFModule {
  constructor() {}
}
