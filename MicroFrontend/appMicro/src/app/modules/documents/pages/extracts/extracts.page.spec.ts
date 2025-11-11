import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { ProductFactory } from '@testing/factories/product.factory';
import { ExtractsFacadeMock } from '@testing/mocks/facade/extracts.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { ExtractsFacade } from './extracts.facade';
import { ExtractsPage } from './extracts.page';

describe('ExtractsPage', () => {
  let component: ExtractsPage;
  let fixture: ComponentFixture<ExtractsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExtractsPage, ImageUrlPipe],
      imports: [TestingModule],
      providers: [{ provide: ExtractsFacade, useClass: ExtractsFacadeMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtractsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call ionView events', () => {
    component.ionViewWillLeave();
    component.ionViewDidLeave();
    expect(component.ionViewWillLeave).toBeDefined();
    expect(component.ionViewDidLeave).toBeDefined();
  });

  it('should be call all gets', () => {
    expect(component.periods$).toBeTruthy();
    expect(component.workingPeriods$).toBeTruthy();
    expect(component.completedPeriods$).toBeTruthy();
  });

  it('should be call changeProduct', () => {
    component.changeProduct(new ProductFactory().create());
    expect(component.changeProduct).toBeDefined();
  });

  it('should be call downloadExtract', () => {
    component.product.setValue(new ProductFactory().create());
    component.downloadExtract({
      period: '',
      startDate: '',
      endDate: '',
      fileId: '',
      fileName: '',
      fileDesc: ''
    });
    expect(component.downloadExtract).toBeDefined();
  });

  it('should be call isDownload$', async () => {
    component.isDownload$('').subscribe((is) => {
      expect(is).toEqual(true);
    });
  });
});
