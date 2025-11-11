import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WithdrawalChannelsStepFacadeMock } from '@testing/mocks/facade/withdrawal-channels-step.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { WithdrawalChannelsStepComponent } from './withdrawal-channels-step.component';
import { WithdrawalChannelsStepFacade } from './withdrawal-channels-step.facade';

describe('WithdrawalChannelsStepComponent', () => {
  let component: WithdrawalChannelsStepComponent;
  let fixture: ComponentFixture<WithdrawalChannelsStepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawalChannelsStepComponent],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: WithdrawalChannelsStepFacade,
          useClass: WithdrawalChannelsStepFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WithdrawalChannelsStepComponent);
    component = fixture.componentInstance;
    component.data = {
      title: 'Mi titulo',
      control: new UntypedFormControl()
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setWithdrawalChannel', () => {
    const channel = 'ATH';
    component.setWithdrawalChannel(channel);
    expect(component.data.control.value).toEqual(channel);
  });
});
