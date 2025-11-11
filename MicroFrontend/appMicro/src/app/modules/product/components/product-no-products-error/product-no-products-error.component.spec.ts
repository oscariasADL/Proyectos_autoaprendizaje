import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { UpperCasePipe } from '@angular/common';

import { ProductNoProductsErrorComponent } from './product-no-products-error.component';
import { TestingModule } from '@testing/testing.module';
import { AppFacade } from '@app/app.facade';

describe('ProductNoProductsErrorComponent', () => {
  let component: ProductNoProductsErrorComponent;
  let fixture: ComponentFixture<ProductNoProductsErrorComponent>;
  let appFacadeStub: Partial<AppFacade>;
  const navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);

  beforeEach(waitForAsync(() => {
    appFacadeStub = {
      dispatch: jasmine.createSpy('dispatch'),
      openExternalLinks: jasmine.createSpy('openExternalLinks')
    };

    TestBed.overrideComponent(ProductNoProductsErrorComponent, {
      add: {
        imports: [IonicModule, TestingModule, UpperCasePipe],
        providers: [
          { provide: AppFacade, useValue: appFacadeStub },
          { provide: NavController, useValue: navCtrlSpy }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(ProductNoProductsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call redirectToLogin', () => {
    component.redirectToLogin();
    expect(navCtrlSpy.navigateRoot).toHaveBeenCalled();
  });

  it('should to call redirectPortal', () => {
    component.redirectPortal();
    expect(navCtrlSpy.navigateRoot).toHaveBeenCalled();
  });
});
