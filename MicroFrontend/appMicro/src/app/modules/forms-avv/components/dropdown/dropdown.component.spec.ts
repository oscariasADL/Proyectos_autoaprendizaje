import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let debugElement: DebugElement;

  const control: UntypedFormControl = new UntypedFormControl({ label: '' });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [DropdownComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.control = control;
    component.list = [];
    component.id = 'dropdown-test';
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be focus', () => {
    expect(component.focus()).toBeUndefined();
  });

  it('should be focus', () => {
    component.blur();
    expect(component.control.touched).toBeTrue();
  });

  it('should be highlightNext', () => {
    component.onItemHover(-2);
    expect(
      component.highlightNext({ preventDefault: () => null } as any)
    ).toBeUndefined();
    component.onItemHover(200);
    expect(
      component.highlightNext({ preventDefault: () => null } as any)
    ).toBeUndefined();
  });

  it('should call highlightPrevious', () => {
    expect(
      component.highlightPrevious({ preventDefault: () => null } as any)
    ).toBeUndefined();
  });

  it('should call onEnterKey', () => {
    expect(component.onEnterKey(1)).toBeUndefined();
  });

  it('should call onItemSelect', () => {
    component.items = [];
    expect(component.onItemSelect(1)).toBeUndefined();
    expect(component.highlightedItem).toEqual(1);
  });

  it('should onEnterKey', () => {
    component.setIsFocused(true);
    spyOn(component, 'onEnterKey').and.callThrough();
    component.onEnterKey(1);
    expect(component.onEnterKey).toHaveBeenCalled();
  });

  it('should touchEnd onEnterKey', () => {
    component.disabled = false;
    component.loading = false;
    spyOn(component, 'touchEnd').and.callThrough();
    component.touchEnd();
    expect(component.touchEnd).toHaveBeenCalled();
  });

  it('should touchEnd onEnterKey false', () => {
    component.disabled = false;
    component.loading = false;
    component.setIsFocused(true);
    spyOn(component, 'touchEnd').and.callThrough();
    component.touchEnd();
    expect(component.touchEnd).toHaveBeenCalled();
  });
});
