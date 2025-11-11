import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { PFMCategoryType } from '@modules/pfm/entities/pfm.interface';
import { TestingModule } from '@testing/testing.module';
import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RadioComponent],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    component.items = [{ value: '123' }];
    component.control = new UntypedFormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateControl', () => {
    expect(component.updateControl('123')).toBeUndefined();
  });

  it('should call pfmCategoryType', () => {
    expect(typeof component.pfmCategoryType).toEqual(typeof PFMCategoryType);
  });
});
