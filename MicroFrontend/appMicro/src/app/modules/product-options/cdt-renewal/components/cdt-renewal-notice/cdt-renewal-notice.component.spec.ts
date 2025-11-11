import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { CdtRenewalFacade } from '@modules/product-options/cdt-renewal/cdt-renewal.facade';
import { CdtRenewalFacadeMock } from '@testing/mocks/facade/cdt-renewal.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { CdtRenewalNoticeComponent } from './cdt-renewal-notice.component';
import { CdtRenewalStatus } from '@modules/product-options/cdt-renewal/entities/cdt-renewal.entity';

describe('CdtRenewalNoticeComponent', () => {
  let component: CdtRenewalNoticeComponent;
  let fixture: ComponentFixture<CdtRenewalNoticeComponent>;

  const navControlSpy = jasmine.createSpyObj('NavController', [
    'navigateForward'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CdtRenewalNoticeComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: CdtRenewalFacade, useClass: CdtRenewalFacadeMock },
        { provide: NavController, useValue: navControlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CdtRenewalNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call redirectCdtRenewal', () => {
    spyOn(component, 'redirectCdtRenewal').and.callThrough();
    component.redirectCdtRenewal();
    expect(component.redirectCdtRenewal).toHaveBeenCalled();
  });

  it('should return CdtRenewalResponse', () => {
    expect(component.cdtRenewalData$).toBeDefined();
  });

  it('should return Boolean showCdtRenewal$', (done) => {
    component.showCdtRenewal$.subscribe((data) => {
      expect(data).toEqual(false);
      done();
    });
  });

  it('should return Boolean disabledCdtRenewal$', (done) => {
    component.disabledCdtRenewal$.subscribe((data) => {
      expect(data).toEqual(false);
      done();
    });
  });

  it('should return cdtRenewalStatus', () => {
    expect(component.cdtRenewalStatus).toEqual(CdtRenewalStatus);
  });
});
