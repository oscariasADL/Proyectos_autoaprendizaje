import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { CurrentPasswordComponent } from './current-password.component';

describe('CurrentPasswordComponent', () => {
  let component: CurrentPasswordComponent;
  let fixture: ComponentFixture<CurrentPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentPasswordComponent],
      imports: [TestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
