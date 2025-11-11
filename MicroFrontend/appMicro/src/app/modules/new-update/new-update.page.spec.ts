import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { SplashScreenService } from '@commons/services/splash-screen.service';
import { IonicModule, NavController } from '@ionic/angular';
import { NewUpdateFacade } from '@modules/new-update/new-update.facade';
import { NewUpdateFacadeMock } from '@testing/mocks/facade/new-update.facade.mock';
import { SplashScreenServiceMock } from '@testing/mocks/services/splash-screen.service.mock';
import { TestingModule } from '@testing/testing.module';
import { NewUpdatePage } from './new-update.page';

describe('NewUpdatePage', () => {
  let component: NewUpdatePage;
  let fixture: ComponentFixture<NewUpdatePage>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);
    TestBed.configureTestingModule({
      declarations: [NewUpdatePage, ImageUrlPipe],
      imports: [IonicModule, TestingModule, HttpClientTestingModule],
      providers: [
        { provide: NavController, useValue: navControlSpy },
        { provide: SplashScreenService, useClass: SplashScreenServiceMock },
        { provide: NewUpdateFacade, useClass: NewUpdateFacadeMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NewUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal', async () => {
    fixture.ngZone.run(() => expect(component.closeModal()).toBeUndefined());
  });

  it('should call goToAppStore', () => {
    spyOn(window, 'open');
    fixture.ngZone.run(() =>
      expect(component.goToAppStore('IOS')).toBeUndefined()
    );
  });
});
