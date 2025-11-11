import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { AdviserAvalComponent } from './adviser-aval.component';
import { TestingModule } from '@testing/testing.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { PFMFacade } from '../../pfm.facade';
import { PFMFacadeMock } from '@testing/mocks/facade/pfm.facade.mock';
import { PFMService } from '@modules/pfm/services/pfm.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { of } from 'rxjs';

describe('AdviserAvalComponent', () => {
  let component: AdviserAvalComponent;
  let fixture: ComponentFixture<AdviserAvalComponent>;
  let pfmServiceMock: jasmine.SpyObj<PFMService>;
  let pfmFacadeMock: PFMFacadeMock;
  let navControllerMock: jasmine.SpyObj<NavController>;
  let mutationObserverMock: jasmine.SpyObj<MutationObserver>;
  let mutationCallback: MutationCallback;

  beforeEach(() => {
    pfmServiceMock = jasmine.createSpyObj('PFMService', [
      'loadConsejeroScript'
    ]);
    navControllerMock = jasmine.createSpyObj('NavController', [
      'navigateForward'
    ]);
    pfmFacadeMock = new PFMFacadeMock();
    mutationObserverMock = jasmine.createSpyObj('MutationObserver', [
      'observe',
      'disconnect'
    ]);

    mutationCallback = null;

    (window as any).MutationObserver = function (callback: MutationCallback) {
      mutationCallback = callback;
      return mutationObserverMock;
    };

    TestBed.configureTestingModule({
      declarations: [AdviserAvalComponent],
      imports: [IonicModule, TestingModule, GlobalPipesModule],
      providers: [
        { provide: PFMFacade, useValue: pfmFacadeMock },
        { provide: PFMService, useValue: pfmServiceMock },
        { provide: NavController, useValue: navControllerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AdviserAvalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(pfmServiceMock.loadConsejeroScript).toHaveBeenCalled();
  });

  it('should call ionViewDidEnter after view init', fakeAsync(() => {
    spyOn(component, 'ionViewDidEnter');

    fixture.detectChanges();
    component.ngAfterViewInit();

    tick(3000);

    expect(component.ionViewDidEnter).toHaveBeenCalled();
  }));

  it('should set up MutationObserver in ionViewDidEnter', () => {
    component.ionViewDidEnter();

    expect(mutationObserverMock.observe).toHaveBeenCalledWith(document.body, {
      childList: true,
      subtree: true
    });
  });

  it('should handle iOS platform correctly in MutationObserver callback', () => {
    spyOn(Capacitor, 'getPlatform').and.returnValue('ios');

    component.ionViewDidEnter();

    expect(mutationCallback).not.toBeNull();

    const mockAdviserElement = document.createElement('div');
    mockAdviserElement.id = 'adviser-aval';

    Object.defineProperty(mockAdviserElement, 'shadowRoot', {
      value: {
        querySelector: jasmine.createSpy('querySelector').and.returnValue({
          shadowRoot: {
            querySelector: jasmine.createSpy('querySelector').and.returnValue({
              setAttribute: jasmine.createSpy('setAttribute')
            })
          }
        })
      },
      configurable: true
    });

    document.body.appendChild(mockAdviserElement);

    spyOn(document, 'querySelector').and.returnValue(mockAdviserElement);

    mutationCallback([], mutationObserverMock);

    expect(mockAdviserElement.shadowRoot.querySelector).toHaveBeenCalledWith(
      '.idw-web-chat-aval'
    );
    const webChatAval =
      mockAdviserElement.shadowRoot.querySelector('.idw-web-chat-aval');
    expect(webChatAval.shadowRoot.querySelector).toHaveBeenCalledWith(
      '.idw-web-chat-aval--button'
    );
    const webChatButton = webChatAval.shadowRoot.querySelector(
      '.idw-web-chat-aval--button'
    );
    expect(webChatButton.setAttribute).toHaveBeenCalledWith(
      'style',
      'bottom: 120px !important'
    );
    expect(mutationObserverMock.disconnect).toHaveBeenCalled();

    document.body.removeChild(mockAdviserElement);
  });

  it('should not set style for non-iOS platform in MutationObserver callback', () => {
    spyOn(Capacitor, 'getPlatform').and.returnValue('android');

    component.ionViewDidEnter();

    const mockAdviserElement = document.createElement('div');
    mockAdviserElement.id = 'adviser-aval';

    const setAttributeSpy = jasmine.createSpy('setAttribute');
    Object.defineProperty(mockAdviserElement, 'shadowRoot', {
      value: {
        querySelector: jasmine.createSpy('querySelector').and.returnValue({
          shadowRoot: {
            querySelector: jasmine.createSpy('querySelector').and.returnValue({
              setAttribute: setAttributeSpy
            })
          }
        })
      },
      configurable: true
    });

    document.body.appendChild(mockAdviserElement);

    spyOn(document, 'querySelector').and.returnValue(mockAdviserElement);

    mutationCallback([], mutationObserverMock);

    expect(setAttributeSpy).not.toHaveBeenCalled();

    document.body.removeChild(mockAdviserElement);
  });

  it('should start conversation and set viewAdviser to true on success', async () => {
    spyOn(pfmFacadeMock, 'advisorStartConversation');

    const mockToken = 'test-token';
    spyOn(pfmFacadeMock.isAdvisorWorking$, 'pipe').and.returnValue(
      of([false, mockToken])
    );

    const result = await component.startConversation();

    expect(pfmFacadeMock.advisorStartConversation).toHaveBeenCalled();
    expect(component.viewAdviser).toBeTrue();
    expect(result).toEqual({ access_token: mockToken });
  });

  it('should navigate forward when adviserNavigate is called', () => {
    const testPath = '/test-path';
    component.adviserNavigate(testPath);
    expect(navControllerMock.navigateForward).toHaveBeenCalledWith(testPath);
  });
});
