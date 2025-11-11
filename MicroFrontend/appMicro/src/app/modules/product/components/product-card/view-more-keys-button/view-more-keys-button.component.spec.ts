import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {
  ViewMoreKeysButtonComponent,
  ViewMoreKeysType
} from './view-more-keys-button.component';
import { TranslateService } from '@ngx-translate/core';
import { TestingModule } from '@testing/testing.module';

xdescribe('ViewMoreKeysButtonComponent', () => {
  let component: ViewMoreKeysButtonComponent;
  let fixture: ComponentFixture<ViewMoreKeysButtonComponent>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;
  beforeEach(async () => {
    translateServiceSpy = jasmine.createSpyObj('TranslateService', [
      'get',
      'instant'
    ]);
    TestBed.configureTestingModule({
      declarations: [ViewMoreKeysButtonComponent],
      imports: [IonicModule.forRoot(), TestingModule],
      providers: [{ provide: TranslateService, useValue: translateServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMoreKeysButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.buttonLabel).toBe('BRE_B.VIEW_MORE_KEYS');
      expect(component.translateParams).toEqual({});
      expect(component.type).toBeUndefined();
    });

    it('should initialize with provided input values', () => {
      const testLabel = 'CUSTOM.LABEL';
      const testParams = { count: 5 };
      const testType = ViewMoreKeysType.primary;

      component.buttonLabel = testLabel;
      component.translateParams = testParams;
      component.type = testType;

      expect(component.buttonLabel).toBe(testLabel);
      expect(component.translateParams).toEqual(testParams);
      expect(component.type).toBe(testType);
    });
  });
  describe('Getter Methods', () => {
    it('should return ViewMoreKeysType enum through viewMoreKeysType getter', () => {
      expect(component.viewMoreKeysType).toBe(ViewMoreKeysType);
      expect(component.viewMoreKeysType.primary).toBe('primary');
      expect(component.viewMoreKeysType.secondary).toBe('secondary');
    });
  });
  describe('Event Emission', () => {
    it('should emit goToBreB event when onClick is called', () => {
      spyOn(component.goToBreB, 'emit');

      component.onClick();

      expect(component.goToBreB.emit).toHaveBeenCalledTimes(1);
      expect(component.goToBreB.emit).toHaveBeenCalledWith();
    });
  });
  describe('Template Rendering - Primary Type', () => {
    beforeEach(() => {
      component.type = ViewMoreKeysType.primary;
    });
  });
});
