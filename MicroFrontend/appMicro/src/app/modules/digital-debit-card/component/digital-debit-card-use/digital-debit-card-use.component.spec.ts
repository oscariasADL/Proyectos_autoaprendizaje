import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, Platform } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { Subscription } from 'rxjs';

import { DigitalDebitCardUseComponent } from './digital-debit-card-use.component';

describe('DigitalDebitCardUseComponent', () => {
  let component: DigitalDebitCardUseComponent;
  let fixture: ComponentFixture<DigitalDebitCardUseComponent>;
  let modalCtrlSpy, platformReadySpy, platformSpy, backButton;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    platformReadySpy = Promise.resolve();
    backButton = {
      subscribeWithPriority: (priority, fn) => {
        fn();
      }
    };
    platformSpy = jasmine.createSpyObj(
      'Platform',
      {
        ready: platformReadySpy,
        backButton: platformReadySpy
      },
      { backButton }
    );
    TestBed.overrideComponent(DigitalDebitCardUseComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [
          { provide: Platform, useValue: platformSpy },
          { provide: ModalController, useValue: modalCtrlSpy }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(DigitalDebitCardUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call to ngDestroy', () => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    component['subscription'] = new Subscription();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should to call to closeModal', async () => {
    await component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
