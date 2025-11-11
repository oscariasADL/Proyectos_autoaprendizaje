import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HOME } from '@app/commons/constants/navigate.constants';
import { IonicModule } from '@ionic/angular';
import { PocketsHasNoProductsComponent } from './pockets-has-no-products.component';

import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeadersModule } from '@app/commons/components/headers/headers.module';
import { PocketsFacade } from '../../pockets.facade';
import { AlertSheetProperties } from '@app/commons/entities/alert/alert-sheet.entities';
import { OPEN_EXTERNAL_URL_ALERT } from '@app/commons/constants/global.constants';

describe('PocketsHasNoProductsComponent', () => {
  let component: PocketsHasNoProductsComponent;
  let fixture: ComponentFixture<PocketsHasNoProductsComponent>;
  let facade: jasmine.SpyObj<PocketsFacade>;
  let pocketFacadeStub: Partial<PocketsFacade>;

  beforeEach(waitForAsync(() => {
    pocketFacadeStub = {
      openExternalLinks(
        url: string,
        target: '_self' | '_blank' = '_blank',
        alertProps: AlertSheetProperties = OPEN_EXTERNAL_URL_ALERT
      ) {
        return;
      }
    };

    TestBed.overrideComponent(PocketsHasNoProductsComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [{ provide: PocketsFacade, useValue: pocketFacadeStub }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      remove: { imports: [HeadersModule] }
    }).compileComponents();

    fixture = TestBed.createComponent(PocketsHasNoProductsComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have HOME constant', () => {
    expect(component.Home).toBe(HOME);
  });
  it('should call to openLink', () => {
    spyOn(pocketFacadeStub, 'openExternalLinks').and.callFake(() => {
      return;
    });
    component.openExternal();
    expect(pocketFacadeStub.openExternalLinks).toHaveBeenCalled();
  });
});
