import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RangeComponent } from './range.component';

describe('RangeComponent', () => {
  let component: RangeComponent;
  let fixture: ComponentFixture<RangeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RangeComponent],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RangeComponent);
    component = fixture.componentInstance;
    component.min = 0;
    component.max = 100;
    component.step = 10;
    component.title = 50;
    component.control = new UntypedFormControl(0);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value', () => {
    expect(component.setValue(123)).toBeUndefined();
  });
});
