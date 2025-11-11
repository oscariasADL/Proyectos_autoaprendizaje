import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule, Platform } from '@ionic/angular';
import { ActivationProductFactory } from '@testing/factories/activation-product.factory';
import { TestingModule } from '@testing/testing.module';
import { MediaActivationCardOptionsComponent } from './media-activation-card-options.component';

describe('MediaActivationCardOptionsComponent', () => {
  let component: MediaActivationCardOptionsComponent;
  let fixture: ComponentFixture<MediaActivationCardOptionsComponent>;
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
    TestBed.configureTestingModule({
      declarations: [MediaActivationCardOptionsComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: ModalController, useValue: modalCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaActivationCardOptionsComponent);
    component = fixture.componentInstance;
    component.product = new ActivationProductFactory().create();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectType', () => {
    expect(component.selectType(null)).toBeUndefined();
  });

  it('should not unsubscribe if subscription is null or undefined', () => {
    Object.defineProperty(component, 'subscription', { value: null });
    component.ngOnDestroy();
    expect(component['subscription']).toBeNull();
  });
});
