import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppFacade } from '@app/app.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, Platform } from '@ionic/angular';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { InactiveChannelComponent } from './inactive-channel.component';

describe('InactiveChannelComponent', () => {
  let component: InactiveChannelComponent;
  let fixture: ComponentFixture<InactiveChannelComponent>;
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
      declarations: [InactiveChannelComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: AppFacade, useClass: AppFacadeMock },
        { provide: ModalController, useValue: modalCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(InactiveChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnDestroy', () => {
    expect(component.ngOnDestroy()).toBeUndefined();
  });

  it('should redirect link', () => {
    window.open = () => window;
    fixture.ngZone.run(() => expect(component.redirectLink()).toBeUndefined());
  });
});
