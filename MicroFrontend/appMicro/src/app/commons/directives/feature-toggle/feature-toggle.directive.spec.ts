import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { FeatureToggleDirective } from './feature-toggle.directive';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('FeatureToggleDirective', () => {
  let viewContainer: ViewContainerRef;
  let templateRef: TemplateRef<string>;
  let facade: AppFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        ViewContainerRef,
        TemplateRef,
        {
          provide: AppFacade,
          useClass: AppFacadeMock
        }
      ]
    });
  }));

  beforeEach(() => {
    viewContainer = TestBed.inject(ViewContainerRef);
    templateRef = TestBed.inject(TemplateRef);
    facade = TestBed.inject(AppFacade);
  });

  it('should create an instance', () => {
    const directive = new FeatureToggleDirective(
      templateRef,
      viewContainer,
      facade
    );
    expect(directive).toBeTruthy();
  });
});
