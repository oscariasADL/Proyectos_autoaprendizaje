import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { ExtractsSelectedProductComponent } from './extracts-selected-product.component';
import { TestingModule } from '@testing/testing.module';
import { ExtractsFacade } from '@modules/documents/pages/extracts/extracts.facade';
import { ExtractsFacadeMock } from '@testing/mocks/facade/extracts.facade.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { ProductFactory } from '@testing/factories/product.factory';
import { ActivatedRoute } from '@angular/router';

describe('ExtractsSelectedProductComponent', () => {
  let component: ExtractsSelectedProductComponent;
  let fixture: ComponentFixture<ExtractsSelectedProductComponent>;
  const navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExtractsSelectedProductComponent, ImageUrlPipe],
      imports: [TestingModule, IonicModule],
      providers: [
        { provide: ExtractsFacade, useClass: ExtractsFacadeMock },
        {
          provide: NavController,
          useValue: navCtrlSpy
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                type: 'SDA',
                id: '74747643'
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtractsSelectedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call downloadExtract', () => {
    expect(
      component.downloadExtract({
        period: '',
        startDate: '',
        endDate: '',
        fileId: '',
        fileName: '',
        fileDesc: ''
      })
    ).toBe(void 0);
  });

  it('should be call isDownload$', async () => {
    component.isDownload$('').subscribe((is) => {
      expect(is).toEqual(true);
    });
  });

  it('should be call all gets', () => {
    expect(component.periods$).toBeTruthy();
    expect(component.workingPeriods$).toBeTruthy();
    expect(component.completedPeriods$).toBeTruthy();
    expect(component.params).toBeTruthy();
    expect(component.isDownloadingSomeFile$).toBeTruthy();
    expect(component.downloadFileName$).toBeTruthy();
  });
});
