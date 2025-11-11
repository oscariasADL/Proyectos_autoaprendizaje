import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AlertBigPictureComponent } from './alert-big-picture.component';
import { TestingModule } from '@testing/testing.module';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { AlertService } from '@commons/services/alert.service';

xdescribe('AlertBigPictureComponent', () => {
  let component: AlertBigPictureComponent;
  let fixture: ComponentFixture<AlertBigPictureComponent>;
  let mockNavController: jasmine.SpyObj<NavController>;
  let mockAlertService: jasmine.SpyObj<AlertService>;
  let mockImageUrlPipe: jasmine.SpyObj<ImageUrlPipe>;

  const defaultProps = {
    id: 'banner6',
    title: 'Registra tus llaves en segundos:',
    description: 'Tag Aval, cédula, celular y correo electrónico',
    remoteImgUri: 'testing',
    buttonText: 'ok'
  };

  beforeEach(waitForAsync(() => {
    mockAlertService = jasmine.createSpyObj('AlertService', ['close']);
    mockNavController = jasmine.createSpyObj('NavController', [
      'navigateForward'
    ]);
    mockImageUrlPipe = jasmine.createSpyObj('ImageUrlPipe', ['transform']);

    mockAlertService.close.and.returnValue(Promise.resolve());
    mockNavController.navigateForward.and.returnValue(Promise.resolve(true));
    mockImageUrlPipe.transform.and.returnValue('transformed-image-url.png');

    TestBed.configureTestingModule({
      declarations: [AlertBigPictureComponent],
      imports: [IonicModule.forRoot(), TestingModule],
      providers: [
        { provide: AlertService, useValue: mockAlertService },
        { provide: NavController, useValue: mockNavController },
        { provide: ImageUrlPipe, useValue: mockImageUrlPipe }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBigPictureComponent);
    component = fixture.componentInstance;
    // Asegurar que props esté definido antes de detectChanges
    component.props = { ...defaultProps };
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize with correct props', () => {
    fixture.detectChanges();

    expect(component.props.id).toBe('banner6');
    expect(component.props.title).toBe('Registra tus llaves en segundos:');
    expect(component.props.description).toBe(
      'Tag Aval, cédula, celular y correo electrónico'
    );
    expect(component.props.buttonText).toBe('ok');
  });

  it('should call ImageUrlPipe transform on initialization', () => {
    fixture.detectChanges();

    expect(mockImageUrlPipe.transform).toHaveBeenCalledWith(
      '/assets/images/illustrations/popup-home/login-background-popup.png',
      true
    );
  });

  it('should initialize backgroundStyle correctly', () => {
    fixture.detectChanges();

    expect(component.backgroundStyle).toEqual({
      'background-image': "url('transformed-image-url.png')",
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat'
    });
  });

  describe('Template rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render the title', () => {
      const titleElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-alert-sheet-body__title')
      );
      expect(titleElement).toBeTruthy();
      expect(titleElement.nativeElement.textContent.trim()).toBe(
        'Registra tus llaves en segundos:'
      );
    });

    it('should render the description', () => {
      const descriptionElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-alert-sheet-body__subtitle')
      );
      expect(descriptionElement).toBeTruthy();
      expect(descriptionElement.nativeElement.textContent.trim()).toBe(
        'Tag Aval, cédula, celular y correo electrónico'
      );
    });

    it('should render the primary button', () => {
      const buttonElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-btn-primary')
      );
      expect(buttonElement).toBeTruthy();
    });

    it('should render close button by default', () => {
      const closeButtonElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-alert-sheet-close')
      );
      expect(closeButtonElement).toBeTruthy();
    });

    it('should set correct id attribute', () => {
      const alertSheetElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-alert-sheet')
      );
      expect(alertSheetElement).toBeTruthy();
      expect(alertSheetElement.nativeElement.id).toBe('banner6');
    });

    it('should apply ngStyle to header element', () => {
      const headerElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-alert-sheet-header')
      );
      expect(headerElement).toBeTruthy();
      expect(headerElement.attributes['ng-reflect-ng-style']).toBeDefined();
    });
  });

  describe('closeModal method', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should call alertService.close()', () => {
      component.closeModal();
      expect(mockAlertService.close).toHaveBeenCalled();
    });

    it('should navigate when navigateOnCloseUrl is provided', () => {
      component.props = { ...defaultProps, navigateOnCloseUrl: '/home' };

      component.closeModal();

      expect(mockAlertService.close).toHaveBeenCalled();
      expect(mockNavController.navigateForward).toHaveBeenCalledWith('/home');
    });

    it('should not navigate when navigateOnCloseUrl is not provided', () => {
      component.closeModal();

      expect(mockAlertService.close).toHaveBeenCalled();
      expect(mockNavController.navigateForward).not.toHaveBeenCalled();
    });

    it('should not navigate when navigateOnCloseUrl is undefined', () => {
      component.props = { ...defaultProps, navigateOnCloseUrl: undefined };

      component.closeModal();

      expect(mockAlertService.close).toHaveBeenCalled();
      expect(mockNavController.navigateForward).not.toHaveBeenCalled();
    });
  });

  describe('User interactions', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should call closeModal when close button is clicked', () => {
      spyOn(component, 'closeModal');

      const closeButtonElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-alert-sheet-close')
      );

      expect(closeButtonElement).toBeTruthy();
      closeButtonElement.triggerEventHandler('click', null);

      expect(component.closeModal).toHaveBeenCalled();
    });

    it('should call closeModal when primary button is clicked', () => {
      spyOn(component, 'closeModal');

      const primaryButtonElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-btn-primary')
      );

      expect(primaryButtonElement).toBeTruthy();
      primaryButtonElement.triggerEventHandler('click', null);

      expect(component.closeModal).toHaveBeenCalled();
    });
  });

  describe('Accessibility attributes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have proper aria-label on close button', () => {
      const closeButtonElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-alert-sheet-close')
      );

      expect(closeButtonElement).toBeTruthy();
      expect(closeButtonElement.nativeElement.getAttribute('aria-label')).toBe(
        'Cerrar'
      );
    });

    it('should have proper role on close button', () => {
      const closeButtonElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-alert-sheet-close')
      );

      expect(closeButtonElement).toBeTruthy();
      expect(closeButtonElement.nativeElement.getAttribute('role')).toBe(
        'button'
      );
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle props with missing properties', () => {
      component.props = {
        id: 'test'
      } as any;

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle empty string values', () => {
      component.props = {
        remoteImgUri: '',
        id: '',
        title: '',
        description: '',
        buttonText: ''
      };

      expect(() => fixture.detectChanges()).not.toThrow();

      const titleElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-alert-sheet-body__title')
      );
      const descriptionElement: DebugElement = fixture.debugElement.query(
        By.css('.avv-alert-sheet-body__subtitle')
      );

      expect(titleElement.nativeElement.textContent.trim()).toBe('');
      expect(descriptionElement.nativeElement.textContent.trim()).toBe('');
    });

    it('should not fail when ImageUrlPipe returns null', () => {
      mockImageUrlPipe.transform.and.returnValue(null);

      expect(() => {
        fixture = TestBed.createComponent(AlertBigPictureComponent);
        component = fixture.componentInstance;
        component.props = { ...defaultProps };
        fixture.detectChanges();
      }).not.toThrow();
    });
  });
});
