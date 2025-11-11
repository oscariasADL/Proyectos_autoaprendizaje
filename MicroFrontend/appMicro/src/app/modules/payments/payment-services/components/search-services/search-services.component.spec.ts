import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { PaymentServicesFacadeMock } from '@testing/mocks/facade/payment-services.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { SearchServicesComponent } from './search-services.component';

describe('SearchServicesComponent', () => {
  let component: SearchServicesComponent;
  let fixture: ComponentFixture<SearchServicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchServicesComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: PaymentServicesFacade,
          useClass: PaymentServicesFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.working).toBeFalse();
  });

  it('should call search', () => {
    expect(component.search('claro')).toBeUndefined();
    expect(component.MINLENGTH_SEARCH).toEqual(3);
  });
});
