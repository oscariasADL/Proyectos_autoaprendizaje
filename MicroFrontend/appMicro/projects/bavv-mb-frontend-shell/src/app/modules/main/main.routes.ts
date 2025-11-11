import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { MainComponent } from './main.component';
import { environment as ENV } from '@environment';
import { startsWith } from '@angular-architects/module-federation-tools';
import { createRemoteEntryGuard } from '../guards/createRemoteEntryGuard.guard';
import { POCKETS_WITH_RETURNS_CREATE } from '@app/commons/constants/navigate.constants';
import { LinkKey } from '@app/commons/entities/parameters/links.entities';

export const MAIN_ROUTES: Routes = [
  {
    matcher: startsWith('spi'),
    canMatch: [
      createRemoteEntryGuard(
        ENV.microfrontends.spiKeys.remoteEntryUrl,
        'Bre-B',
        '/remotes/spi'
      )
    ],
    loadChildren: () =>
      import('../spi-keys/spi-keys.component.module').then(
        (m) => m.SPIKeysMFModule
      )
  },
  {
    path: 'abrir-cdt-digital',
    component: MainComponent,
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: ENV.microfrontends.cdt,
        exposedModule: './Module'
      })
        .then((m) => m.FlightsModule)
        .catch(async (_) => {
          const m = await import('../mf-fallback/mf-fallback.module');
          return m.MfFallbackPageModule;
        })
  },
  {
    path: 'vivienda-digital',
    canMatch: [
      createRemoteEntryGuard(
        ENV.microfrontends.digitalHousing.remoteEntryUrl,
        'Vivienda Digital',
        'remotes/vivienda-digital',
        LinkKey.linkDigitalHousing
      )
    ],
    loadChildren: () =>
      import('../digital-housing/digital-housing.module').then(
        (m) => m.DigitalHousingModule
      )
  },
  {
    path: 'tarjeta-credito',
    canMatch: [
      createRemoteEntryGuard(
        ENV.microfrontends.creditCard.remoteEntryUrl,
        'Tarjeta de Crédito',
        '/remotes/tarjeta-crédito',
        LinkKey.linkCreditCard
      )
    ],

    loadChildren: () =>
      import('../credit-card/credit-card.module').then(
        (m) => m.CreditCardModule
      )
  },
  {
    path: 'libre-inversion',
    canMatch: [
      createRemoteEntryGuard(
        ENV.microfrontends.personalLoan.remoteEntryUrl,
        'Libre Inversion',
        '/remotes/libre-inversion',
        LinkKey.linkDla
      )
    ],
    loadChildren: () =>
      import('../personal-loan/personal-loan.module').then(
        (m) => m.PersonalLoanModule
      )
  },
  {
    path: 'mf-fallback',
    loadChildren: () =>
      import('../mf-fallback/mf-fallback.module').then(
        (m) => m.MfFallbackPageModule
      )
  }
];
