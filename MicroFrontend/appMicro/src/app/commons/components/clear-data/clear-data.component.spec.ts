import { CUSTOM_ELEMENTS_SCHEMA, InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { IonicModule } from '@ionic/angular';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';

import { ClearDataComponent } from './clear-data.component';

describe('ClearDataComponent', () => {
  const WINDOW = new InjectionToken('Window');
  const windowMock = {
    location: {
      reload: jasmine.createSpy('reload')
    }
  };
  let component: ClearDataComponent;
  let fixture: ComponentFixture<ClearDataComponent>;
  let secureStorageSpy: jasmine.SpyObj<AdlSecureStorageService>;

  beforeEach(async () => {
    secureStorageSpy = jasmine.createSpyObj('AdlSecureStorageService', [
      'cleanAllDB'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ClearDataComponent],
      providers: [
        { provide: AdlSecureStorageService, useValue: secureStorageSpy },
        { provide: WINDOW, useValue: windowMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClearDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear data', async () => {
    spyOn(component, 'reload').and.stub();

    await component.clearData();

    expect(secureStorageSpy.cleanAllDB).toHaveBeenCalled();

    expect(component.reload).toHaveBeenCalled();
  });
});
