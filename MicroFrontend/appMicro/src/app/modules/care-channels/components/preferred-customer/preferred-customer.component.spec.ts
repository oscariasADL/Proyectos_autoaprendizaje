import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PreferredCustomerComponent } from './preferred-customer.component';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { AlertService } from '@commons/services/alert.service';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { TestingModule } from '@testing/testing.module';

describe('PreferredCustomerComponent', () => {
  let component: PreferredCustomerComponent;
  let fixture: ComponentFixture<PreferredCustomerComponent>;
  const alertServiceSpy = jasmine.createSpyObj('AlertService', ['create']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PreferredCustomerComponent, ImageUrlPipe],
      imports: [TestingModule, IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AppFacade, useClass: AppFacadeMock },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PreferredCustomerComponent);
    component = fixture.componentInstance;
    component.adviser = {
      contactName: '',
      contactEmail: '',
      contactJobTitle: '',
      contactPhone: ''
    };
    component.working = false;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
