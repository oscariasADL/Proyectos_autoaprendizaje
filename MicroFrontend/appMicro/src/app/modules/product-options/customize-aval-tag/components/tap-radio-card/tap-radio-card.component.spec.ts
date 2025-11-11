import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output
} from '@angular/core';
import { TapRadioCardComponent } from './tap-radio-card.component';
import { TestingModule } from '@testing/testing.module';

// Mock del componente RadioBtnComponent
@Component({
  selector: 'avv-radio-btn',
  template: '<div></div>'
})
class MockRadioBtnComponent {
  @Input() value: any;
  @Input() name: string = '';
  @Input() selectedValue: any = null;
  @Output() radioChange = new EventEmitter<any>();
}

xdescribe('TapRadioCardComponent', () => {
  let component: TapRadioCardComponent;
  let fixture: ComponentFixture<TapRadioCardComponent>;
  let mockRadioBtn: MockRadioBtnComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TapRadioCardComponent, MockRadioBtnComponent],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TapRadioCardComponent);
    component = fixture.componentInstance;

    // Configurar el ViewChild mock
    mockRadioBtn = new MockRadioBtnComponent();
    component.radioBtnComponent = mockRadioBtn as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it('should have default values for inputs', () => {
      expect(component.title).toBe('');
      expect(component.subtitle).toBe('');
      expect(component.radioName).toBe('default-group');
      expect(component.selectedValue).toBeNull();
      expect(component.tag).toBe('');
    });

    it('should accept input values', () => {
      const testTitle = 'Test Title';
      const testSubtitle = 'Test Subtitle';
      const testRadioValue = 'test-value';
      const testRadioName = 'test-group';
      const testSelectedValue = 'selected-value';
      const testTag = 'test-tag';

      component.title = testTitle;
      component.subtitle = testSubtitle;
      component.radioValue = testRadioValue;
      component.radioName = testRadioName;
      component.selectedValue = testSelectedValue;
      component.tag = testTag;

      expect(component.title).toBe(testTitle);
      expect(component.subtitle).toBe(testSubtitle);
      expect(component.radioValue).toBe(testRadioValue);
      expect(component.radioName).toBe(testRadioName);
      expect(component.selectedValue).toBe(testSelectedValue);
      expect(component.tag).toBe(testTag);
    });
  });

  describe('onCardClick', () => {
    it('should not throw error when radioBtnComponent is null', () => {
      component.radioBtnComponent = null as any;

      expect(() => component.onCardClick()).not.toThrow();
    });

    it('should still emit cardClick event when radioBtnComponent is null', () => {
      component.radioBtnComponent = null as any;
      const testValue = 'test-value';
      component.radioValue = testValue;

      spyOn(component.cardClick, 'emit');

      component.onCardClick();

      expect(component.cardClick.emit).toHaveBeenCalledWith(testValue);
    });

    it('should not throw error when radioBtnComponent is undefined', () => {
      component.radioBtnComponent = undefined as any;

      expect(() => component.onCardClick()).not.toThrow();
    });
  });

  describe('onRadioChanged', () => {
    it('should emit radioChange event with the provided value', () => {
      const testValue = 'changed-value';

      spyOn(component.radioChange, 'emit');

      component.onRadioChanged(testValue);

      expect(component.radioChange.emit).toHaveBeenCalledWith(testValue);
    });

    it('should emit radioChange event with null value', () => {
      spyOn(component.radioChange, 'emit');

      component.onRadioChanged(null);

      expect(component.radioChange.emit).toHaveBeenCalledWith(null);
    });

    it('should emit radioChange event with object value', () => {
      const testObject = { id: 1, name: 'test' };

      spyOn(component.radioChange, 'emit');

      component.onRadioChanged(testObject);

      expect(component.radioChange.emit).toHaveBeenCalledWith(testObject);
    });
  });
  describe('onRadioChanged', () => {
    it('should emit radioChange event with the provided value', () => {
      const testValue = 'changed-value';

      spyOn(component.radioChange, 'emit');

      component.onRadioChanged(testValue);

      expect(component.radioChange.emit).toHaveBeenCalledWith(testValue);
    });

    it('should emit radioChange event with null value', () => {
      spyOn(component.radioChange, 'emit');

      component.onRadioChanged(null);

      expect(component.radioChange.emit).toHaveBeenCalledWith(null);
    });

    it('should emit radioChange event with object value', () => {
      const testObject = { id: 1, name: 'test' };

      spyOn(component.radioChange, 'emit');

      component.onRadioChanged(testObject);

      expect(component.radioChange.emit).toHaveBeenCalledWith(testObject);
    });
  });

  describe('Event Emitters', () => {
    it('should have cardClick EventEmitter', () => {
      expect(component.cardClick).toBeInstanceOf(EventEmitter);
    });

    it('should have radioChange EventEmitter', () => {
      expect(component.radioChange).toBeInstanceOf(EventEmitter);
    });
  });

  describe('ViewChild', () => {
    it('should have radioBtnComponent ViewChild reference', () => {
      expect(component.radioBtnComponent).toBeDefined();
    });
  });
});
