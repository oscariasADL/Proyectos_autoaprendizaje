import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RadioBtnComponent } from './radio-btn.component';

xdescribe('RadioBtnComponent', () => {
  let component: RadioBtnComponent;
  let fixture: ComponentFixture<RadioBtnComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioBtnComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RadioBtnComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should have default values', () => {
      expect(component.name).toBe('radio-group');
      expect(component.disabled).toBe(false);
      expect(component.selectedValue).toBe(null);
    });

    it('should accept input values', () => {
      component.value = 'test-value';
      component.name = 'test-name';
      component.disabled = true;

      expect(component.value).toBe('test-value');
      expect(component.name).toBe('test-name');
      expect(component.disabled).toBe(true);
    });
  });

  describe('isSelected method', () => {
    it('should return true when selectedValue matches value', () => {
      component.value = 'test-value';
      component.selectedValue = 'test-value';

      expect(component.isSelected()).toBe(true);
    });

    it('should return false when selectedValue does not match value', () => {
      component.value = 'test-value';
      component.selectedValue = 'other-value';

      expect(component.isSelected()).toBe(false);
    });

    it('should return false when selectedValue is null', () => {
      component.value = 'test-value';
      component.selectedValue = null;

      expect(component.isSelected()).toBe(false);
    });
  });

  describe('select method', () => {
    it('should call onRadioChange when not disabled', () => {
      spyOn(component, 'onRadioChange');

      component.select();

      expect(component.onRadioChange).toHaveBeenCalled();
    });

    it('should not call onRadioChange when disabled', () => {
      component.disabled = true;
      spyOn(component, 'onRadioChange');

      component.select();

      expect(component.onRadioChange).not.toHaveBeenCalled();
    });
  });

  describe('ControlValueAccessor implementation', () => {
    describe('writeValue', () => {
      it('should update selectedValue', () => {
        const testValue = 'test-value';

        component.writeValue(testValue);

        expect(component.selectedValue).toBe(testValue);
      });

      it('should handle null values', () => {
        component.writeValue(null);

        expect(component.selectedValue).toBe(null);
      });
    });

    describe('setDisabledState', () => {
      it('should update disabled property', () => {
        component.setDisabledState(true);
        expect(component.disabled).toBe(true);

        component.setDisabledState(false);
        expect(component.disabled).toBe(false);
      });
    });
  });

  describe('EventEmitter', () => {
    it('should emit selectionChange event on radio change', () => {
      spyOn(component.selectionChange, 'emit');
      component.value = 'test-value';

      component.onRadioChange();

      expect(component.selectionChange.emit).toHaveBeenCalledWith('test-value');
    });

    it('should not emit selectionChange when disabled', () => {
      spyOn(component.selectionChange, 'emit');
      component.disabled = true;
      component.value = 'test-value';

      component.onRadioChange();

      expect(component.selectionChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined values', () => {
      component.writeValue(undefined);
      expect(component.selectedValue).toBe(undefined);

      component.value = undefined;
      component.selectedValue = undefined;
      expect(component.isSelected()).toBe(true);
    });

    it('should handle different data types', () => {
      // Números
      component.value = 1;
      component.selectedValue = 1;
      expect(component.isSelected()).toBe(true);

      // Booleanos
      component.value = true;
      component.selectedValue = true;
      expect(component.isSelected()).toBe(true);

      // Objetos
      const obj = { id: 1, name: 'test' };
      component.value = obj;
      component.selectedValue = obj;
      expect(component.isSelected()).toBe(true);
    });
  });
});
