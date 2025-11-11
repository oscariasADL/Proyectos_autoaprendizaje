import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { ErrorWithoutProductsFacadeMock } from '@testing/mocks/facade/error-without-products.mock.facade';
import { TestingModule } from '@testing/testing.module';
import { ErrorWithoutProductsFacade } from './error-without-products.facade';
import { ErrorWithoutProductsPage } from './error-without-products.page';

describe('ErrorWithoutProductsPage', () => {
  let component: ErrorWithoutProductsPage;
  let fixture: ComponentFixture<ErrorWithoutProductsPage>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);
    TestBed.configureTestingModule({
      declarations: [ErrorWithoutProductsPage, ImageUrlPipe],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: ErrorWithoutProductsFacade,
          useClass: ErrorWithoutProductsFacadeMock
        },
        { provide: NavController, useValue: navControlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorWithoutProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onRetry and logout', () => {
    expect(component.onRetry()).toBeUndefined();
    expect(component.logout()).toBeUndefined();
  });
});
