import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { AlertInfoComponent } from './alert-info.component';
import { UtagDirective } from '@commons/directives/tealium/utag.directive';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';

describe('AlertInfoComponent', () => {
  let component: AlertInfoComponent;
  let fixture: ComponentFixture<AlertInfoComponent>;
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
      declarations: [AlertInfoComponent, ImageUrlPipe, UtagDirective],
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

    fixture = TestBed.createComponent(AlertInfoComponent);
    component = fixture.componentInstance;

    // Inicializar props con un objeto vacío para evitar errores de undefined
    component.props = {} as AlertSheetProperties;

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

  it('should handle checkbox change', () => {
    const event = { detail: { checked: true } };
    component.onCheckboxChange(event);
    expect(component.isChecked).toBe(true);

    const event2 = { detail: { checked: false } };
    component.onCheckboxChange(event2);
    expect(component.isChecked).toBe(false);
  });
});
