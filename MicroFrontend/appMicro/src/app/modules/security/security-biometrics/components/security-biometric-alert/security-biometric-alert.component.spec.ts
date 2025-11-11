import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { SecurityBiometricAlertComponent } from './security-biometric-alert.component';
import { StoreModule } from '@ngrx/store';

describe('SecurityBiometricAlertComponent', () => {
  let component: SecurityBiometricAlertComponent;
  let fixture: ComponentFixture<SecurityBiometricAlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityBiometricAlertComponent],
      imports: [IonicModule, TestingModule, StoreModule.forRoot({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityBiometricAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true and call sendCustomFactsRSA when hasBiometric is true', () => {
    spyOn(component.option, 'emit');
    component.hasBiometric = true;

    component.onToggleBiometrics();

    expect(component.option.emit).toHaveBeenCalledWith(true);
  });

  it('should emit true and NOT call sendCustomFactsRSA when hasBiometric is false', () => {
    spyOn(component.option, 'emit');
    component.hasBiometric = false;

    component.onToggleBiometrics();

    expect(component.option.emit).toHaveBeenCalledWith(true);
  });
});
