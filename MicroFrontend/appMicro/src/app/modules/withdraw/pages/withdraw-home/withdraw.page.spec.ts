import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';

import { WithdrawPage } from './withdraw.page';

xdescribe('WithdrawPage', () => {
  let component: WithdrawPage;
  let fixture: ComponentFixture<WithdrawPage>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot',
      'navigateBack',
      'navigateForward',
      'pop'
    ]);
    TestBed.configureTestingModule({
      declarations: [WithdrawPage, ImageUrlPipe],
      imports: [IonicModule, RouterTestingModule],
      providers: [{ provide: NavController, useValue: navControlSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WithdrawPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
