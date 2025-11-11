import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule } from '@ionic/angular';
import { HomeFacade } from '@modules/home/home.facade';
import { HomeFacadeMock } from '@testing/mocks/facade/home.facade.mock';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { TestingModule } from '@testing/testing.module';

import { HomePromotionsComponent } from './home-promotions.component';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('HomePromotionsComponent', () => {
  let component: HomePromotionsComponent;
  let fixture: ComponentFixture<HomePromotionsComponent>;
  let alertService: AlertService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePromotionsComponent, ImageUrlPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        IonicModule,
        TestingModule,
        GlobalPipesModule,
        TranslateModule.forChild()
      ],
      providers: [
        { provide: HomeFacade, useClass: HomeFacadeMock },
        { provide: AlertService, useClass: AlertServiceMock },
        { provide: AppFacade, useClass: AppFacadeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePromotionsComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirectLink', () => {
    const alertServiceSpy = spyOn(alertService, 'create');
    alertServiceSpy.and.returnValue(Promise.resolve(true));
    expect(component.redirectLink()).toBeUndefined();

    alertServiceSpy.and.returnValue(Promise.resolve(false));
    expect(component.redirectLink()).toBeUndefined();
  });
});
