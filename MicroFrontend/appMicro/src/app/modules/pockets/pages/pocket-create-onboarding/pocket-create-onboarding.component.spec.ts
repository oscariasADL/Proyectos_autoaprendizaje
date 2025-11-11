import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { PocketCreateOnboardingComponent } from './pocket-create-onboarding.component';
import { TestingModule } from '@testing/testing.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { OPEN_EXTERNAL_URL_ALERT } from '@commons/constants/global.constants';
import { CommonsModule } from '@app/commons/commons.module';

describe('OnboardingComponent', () => {
  let component: PocketCreateOnboardingComponent;
  let fixture: ComponentFixture<PocketCreateOnboardingComponent>;
  let pocketsFacadeStub: Partial<PocketsFacade>;

  beforeEach(waitForAsync(() => {
    pocketsFacadeStub = {
      openExternalLinks(
        url: string,
        target: '_self' | '_blank' = '_blank',
        alertProps: AlertSheetProperties = OPEN_EXTERNAL_URL_ALERT,
        closeModalId: string = null
      ) {
        return;
      }
    };
    TestBed.overrideComponent(PocketCreateOnboardingComponent, {
      add: {
        imports: [TestingModule, RouterModule],
        providers: [{ provide: PocketsFacade, useValue: pocketsFacadeStub }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      remove: {
        imports: [HeadersModule, FeatureToggleDirective, CommonsModule]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketCreateOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to openUrl', () => {
    const openExternalLinksSpy = spyOn(
      pocketsFacadeStub,
      'openExternalLinks'
    ).and.callThrough();
    component.openUrl('https://www.google.com');
    expect(openExternalLinksSpy).toHaveBeenCalled();
  });
});
