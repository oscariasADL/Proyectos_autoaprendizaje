import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { AlertOptionsComponent } from './alert-options.component';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('AlertOptionsComponent', () => {
  let component: AlertOptionsComponent;
  let fixture: ComponentFixture<AlertOptionsComponent>;
  let modalSpy;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    TestBed.configureTestingModule({
      declarations: [AlertOptionsComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: AppFacade,
          useClass: AppFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnDestroy', () => {
    expect(component.ngOnDestroy()).toBeUndefined();
    (component as any).subscription = null;
    expect(component.ngOnDestroy()).toBeUndefined();
  });

  it('should call closeModal', async () => {
    expect(component.closeModal()).toBeUndefined();
  });

  it('should call toggleCheck', () => {
    component.toggleCheck();
    expect(component.notShowAgain).toBeFalse();
    component.toggleCheck(true);
    expect(component.notShowAgain).toBeTrue();
  });
});
