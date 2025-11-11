import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { of } from 'rxjs';

import { ActivateTokenPage } from './activate-token.page';
import { TestingModule } from '@testing/testing.module';
import { ActivateTokenFacade } from '@modules/wallets/pages/activate-token/activate-token.facade';
import { ActivateTokenFacadeMock } from '@testing/mocks/facade/activate-token.facade.mock';
import { HOME } from '@commons/constants/navigate.constants';
import {
  ACTIVATION_ERROR,
  ACTIVATION_SUCCESS
} from '@modules/wallets/pages/activate-token/constants/activate-token.constants';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';

describe('ActivateTokenPage', () => {
  let component: ActivateTokenPage;
  let fixture: ComponentFixture<ActivateTokenPage>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let facadeMock: ActivateTokenFacadeMock;

  beforeEach(waitForAsync(() => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);
    facadeMock = new ActivateTokenFacadeMock();

    TestBed.configureTestingModule({
      declarations: [ActivateTokenPage, ImageUrlPipe],
      imports: [TestingModule, IonicModule],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: ActivateTokenFacade, useValue: facadeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchLastToken on ngOnInit', () => {
    spyOn(facadeMock, 'fetchLastToken');
    component.ngOnInit();
    expect(facadeMock.fetchLastToken).toHaveBeenCalled();
  });

  it('should navigate back to HOME on closeAction', () => {
    component.closeAction();
    expect(navCtrlSpy.navigateRoot).toHaveBeenCalledWith(HOME, {
      replaceUrl: true
    });
  });

  it('should map isActivated$ to ACTIVATION_SUCCESS when activated', (done) => {
    facadeMock.setIsActivated(true);
    component.infoActivationData$.subscribe((data) => {
      expect(data).toEqual(ACTIVATION_SUCCESS);
      done();
    });
  });

  it('should map isActivated$ to ACTIVATION_ERROR when not activated', (done) => {
    facadeMock.setIsActivated(false);
    component.infoActivationData$.subscribe((data) => {
      expect(data).toEqual(ACTIVATION_ERROR);
      done();
    });
  });

  it('should expose working$ from facade', (done) => {
    facadeMock.working$ = of(true);
    component.working$.subscribe((working) => {
      expect(working).toBeTrue();
      done();
    });
  });

  it('should expose completed$ from facade', (done) => {
    facadeMock.completed$ = of(true);
    component.completed$.subscribe((completed) => {
      expect(completed).toBeTrue();
      done();
    });
  });

  it('should expose isActivated$ from facade', (done) => {
    facadeMock.isActivated$ = of(true);
    component.isActivated$.subscribe((isActivated) => {
      expect(isActivated).toBeTrue();
      done();
    });
  });
});
