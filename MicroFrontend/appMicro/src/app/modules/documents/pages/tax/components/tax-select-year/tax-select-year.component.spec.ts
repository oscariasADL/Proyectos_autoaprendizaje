import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSelectYearComponent } from './tax-select-year.component';
import { TestingModule } from '@testing/testing.module';
import { TaxFacade } from '../../tax.facade';
import { TaxFacadeMock } from '@testing/mocks/facade/tax.facade.mock';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { ToastrService } from 'ngx-toastr';

describe('TaxSelectYearComponent', () => {
  let component: TaxSelectYearComponent;
  let fixture: ComponentFixture<TaxSelectYearComponent>;
  let facade: TaxFacade;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxSelectYearComponent],
      imports: [TestingModule],
      providers: [
        { provide: TaxFacade, useClass: TaxFacadeMock },
        {
          provide: ToastrService,
          useValue: {
            [ToastType.success]: (a, b, c) => {
              return;
            },
            clear: () => {
              return;
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxSelectYearComponent);
    facade = TestBed.inject(TaxFacade);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should destroy toast', () => {
    spyOn(toastrService, 'clear');
    component.ngOnDestroy();
    expect(toastrService.clear).toHaveBeenCalled();
  });

  it('should download certificate', () => {
    spyOn(facade, 'fetchTaxCertificate');
    component.downloadTaxCertificate(2020);
    expect(facade.fetchTaxCertificate).toHaveBeenCalled();
  });

  it('should get the download state from a specific year', (done) => {
    component.isDownload$(2010).subscribe((response) => {
      expect(response).toBeTruthy();
      done();
    });
  });

  it('should get the dowloading year', (done) => {
    component.downloadFileYear$.subscribe((response) => {
      expect(response).toBe(2010);
      done();
    });
  });

  it('should know if a certficate is downloading', (done) => {
    component.isDownloadingSomeCertificate$.subscribe((response) => {
      expect(response).toBeFalsy();
      done();
    });
  });

  it('should get the last years', () => {
    const currentYear = new Date().getFullYear();
    expect(component.latestYears).toEqual([
      currentYear - 1,
      currentYear - 2,
      currentYear - 3
    ]);
  });
});
