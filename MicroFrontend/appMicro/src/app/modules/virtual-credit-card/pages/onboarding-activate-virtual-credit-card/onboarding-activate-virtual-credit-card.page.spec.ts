import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { OnboardingActivateVirtualCreditCardPage } from './onboarding-activate-virtual-credit-card.page';
import { TestingModule } from '@testing/testing.module';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { VirtualCreditCardFacadeMock } from '@testing/mocks/facade/virtual-credit-card.facade.mock';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { PreloadImageDirective } from '@commons/directives/preload-image/preload-image.directive';

describe('OnboardingActivateVirtualCreditCardPage', () => {
  let component: OnboardingActivateVirtualCreditCardPage;
  let fixture: ComponentFixture<OnboardingActivateVirtualCreditCardPage>;
  let virtualCreditCardFacadeMock: VirtualCreditCardFacadeMock;

  beforeEach(waitForAsync(() => {
    virtualCreditCardFacadeMock = new VirtualCreditCardFacadeMock();
    TestBed.configureTestingModule({
      declarations: [OnboardingActivateVirtualCreditCardPage, ImageUrlPipe],
      imports: [
        TestingModule,
        IonicModule,
        RouterTestingModule,
        PreloadImageDirective
      ],
      providers: [
        {
          provide: VirtualCreditCardFacade,
          useValue: virtualCreditCardFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingActivateVirtualCreditCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose productSelected$ from facade', (done) => {
    component.franchiseCardImage$.subscribe((franchiseCardImage) => {
      expect(franchiseCardImage).toEqual(
        'virtual-credit-card/virtual-credit-card-visa.png'
      );
      done();
    });
  });

  it('should call to showFrequentQuestions', () => {
    const showFrequentQuestionsSpy = spyOn(
      virtualCreditCardFacadeMock,
      'showFrequentQuestions'
    );
    component.showFrequentQuestions();
    expect(showFrequentQuestionsSpy).toHaveBeenCalled();
  });
});
