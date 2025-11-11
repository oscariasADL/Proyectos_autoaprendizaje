import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, Platform } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { TermsDetailComponent } from './terms-detail.component';
import { Subscription } from 'rxjs';

describe('TermsDetailComponent', () => {
  let component: TermsDetailComponent;
  let fixture: ComponentFixture<TermsDetailComponent>;
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
      declarations: [TermsDetailComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: ModalController, useValue: modalCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TermsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnDestroy', () => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    component['subscription'] = new Subscription();
    spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
  });

  it('should call closeModal', async () => {
    spyOn(component, 'closeModal').and.callThrough();
    await component.closeModal();
    expect(component.closeModal).toHaveBeenCalled();
  });
});
