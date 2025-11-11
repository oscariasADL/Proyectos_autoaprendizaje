import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { TestingModule } from '@testing/testing.module';
import { TransfersHomePage } from './transfers-home.page';
import { StripTagsPipe } from '@commons/pipes/strip-tags.pipe';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('TransfersHomePage', () => {
  let component: TransfersHomePage;
  let fixture: ComponentFixture<TransfersHomePage>;
  const navControlSpy = jasmine.createSpyObj('NavController', [
    'navigateRoot',
    'navigateBack',
    'navigateForward',
    'pop'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersHomePage, ImageUrlPipe, StripTagsPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: NavController, useValue: navControlSpy },
        { provide: AppFacade, useClass: AppFacadeMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
