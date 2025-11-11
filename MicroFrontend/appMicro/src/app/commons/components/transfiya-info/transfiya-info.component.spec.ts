import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, Platform } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { TransfiyaInfoComponent } from './transfiya-info.component';
import { Subscription } from 'rxjs';
import { MailboxDatePipe } from '@commons/pipes/mailbox-date.pipe';

describe('TransfiyaInfoComponent', () => {
  let component: TransfiyaInfoComponent;
  let fixture: ComponentFixture<TransfiyaInfoComponent>;
  const modalCtrlSpy = jasmine.createSpyObj<ModalController>(
    'ModalController',
    ['dismiss']
  );
  let platformReadySpy, platformSpy, backButton;

  beforeEach(waitForAsync(() => {
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
      declarations: [TransfiyaInfoComponent, ImageUrlPipe, MailboxDatePipe],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: ModalController, useValue: modalCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfiyaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnDestroy', () => {
    component.subscribe = new Subscription();
    spyOn(component.subscribe, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscribe.unsubscribe).toHaveBeenCalled();
  });

  it('should call closeModal', async () => {
    modalCtrlSpy.dismiss.and.returnValue(Promise.resolve(true));
    try {
      component.closeModal();
      expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
    } catch (error) {
      fail(`closeModal threw an error: ${error}`);
    }
  });
});
