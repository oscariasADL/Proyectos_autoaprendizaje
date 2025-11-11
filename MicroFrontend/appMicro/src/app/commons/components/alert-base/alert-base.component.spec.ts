import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertBaseComponent } from './alert-base.component';
import { TestingModule } from '@testing/testing.module';
import { MailboxDatePipe } from '@commons/pipes/mailbox-date.pipe';
import { ShareFacade } from '@commons/components/share/share.facade';
import { ShareFacadeMock } from '@testing/mocks/facade/share.facade.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('AlertBaseComponent', () => {
  let component: AlertBaseComponent;
  let fixture: ComponentFixture<AlertBaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ShareFacade,
          useClass: ShareFacadeMock
        },
        {
          provide: AppFacade,
          useClass: AppFacadeMock
        }
      ],
      declarations: [AlertBaseComponent, MailboxDatePipe],
      imports: [IonicModule, TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
