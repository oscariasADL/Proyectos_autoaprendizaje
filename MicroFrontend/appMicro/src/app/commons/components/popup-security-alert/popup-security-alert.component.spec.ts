import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { faker } from '@faker-js/faker';

import { PopupSecurityAlertComponent } from './popup-security-alert.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlAltPipe } from '@commons/pipes/image-url-alt.pipe';
import { PreloadImageDirective } from '@commons/directives/preload-image/preload-image.directive';

describe('PopupSecurityAlertComponent', () => {
  let component: PopupSecurityAlertComponent;
  let fixture: ComponentFixture<PopupSecurityAlertComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PopupSecurityAlertComponent, ImageUrlAltPipe],
      imports: [
        IonicModule,
        TestingModule,
        RouterTestingModule.withRoutes([]),
        PreloadImageDirective
      ],
      providers: [
        { provide: ModalController, useValue: modalCtrlSpy },
        { provide: NavController, useValue: navCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupSecurityAlertComponent);
    component = fixture.componentInstance;
    component.title = faker.random.words(3);
    component.paragraphs = [
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
      faker.lorem.paragraph()
    ];
    component.okButtonText = faker.random.words(2);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal in onClick', async () => {
    spyOn(component, 'closeModal').and.returnValue(Promise.resolve());
    await component.onClick();
    expect(component.closeModal).toHaveBeenCalledWith(true);
  });

  it('should call closeModal', async () => {
    expect(await component.closeModal()).toBe(void 0);
  });

  it('should navigate in redirectUrl param', async () => {
    spyOn(component, 'closeModal').and.returnValue(Promise.resolve());
    component.redirectUrl = '/';
    await component.onClick();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalled();
  });
});
