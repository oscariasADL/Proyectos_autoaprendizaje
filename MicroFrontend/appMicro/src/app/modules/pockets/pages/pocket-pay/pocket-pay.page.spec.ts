import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { PocketsFacadeMock } from '@testing/mocks/facade/pockets.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { PocketPayPage } from './pocket-pay.page';
import { POCKET_TYPE_PARAM } from '@modules/pockets/constants/pockets.constants';

describe('PocketPayPage', () => {
  let component: PocketPayPage;
  let fixture: ComponentFixture<PocketPayPage>;
  const activatedRouteSpy = jasmine.createSpyObj(
    'ActivatedRoute',
    {},
    {
      snapshot: {
        paramMap: new Map([[POCKET_TYPE_PARAM, 'T']])
      }
    }
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PocketPayPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        },
        {
          provide: PocketsFacade,
          useClass: PocketsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pay pocket', () => {
    const app = fixture.debugElement.componentInstance;
    app.amount.setValue(1000);
    expect(app.payPocket()).toBeUndefined();
  });

  it('should call setConfirmationData', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.setConfirmationData()).toBeTruthy();
  });

  it('should be defined backUrl$', () => {
    expect(component.backUrl$).toBeDefined();
  });

  it('should be defined pocket$', () => {
    expect(component.pocket$).toBeDefined();
  });

  it('should be defined product$', () => {
    expect(component.product$).toBeDefined();
  });

  it('should be defined amount', () => {
    expect(component.amount).toBeDefined();
  });
});
