import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupportFacadeMock } from '@testing/mocks/facade/support.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { firstValueFrom, of, BehaviorSubject } from 'rxjs';
import { SupportFacade } from './support.facade';
import { SupportPage } from './support.page';
import { ParameterType } from '@app/store/state/parameter.state';

describe('SupportPage', () => {
  let component: SupportPage;
  let fixture: ComponentFixture<SupportPage>;
  let facade: jasmine.SpyObj<SupportFacade>;

  const mockInitialData = {
    category1: {
      items: [
        { title: 'Pagos', url: 'url1' },
        { title: 'Créditos', url: 'url2' }
      ]
    },
    category2: {
      items: [
        { title: 'Servicios', url: 'url3' },
        { title: 'Avalúos comerciales', url: 'url4' }
      ]
    }
  };

  const mockSpiData = {
    questions: [
      {
        title: '¿Qué es un sistema de pagos inmediatos?',
        content: 'Ejemplo de texto de sistema de pagos- contenido'
      },
      {
        title: '¿Cómo funcionan los créditos?',
        content: 'Información sobre créditos'
      },
      {
        title: 'Servicios disponibles',
        content: 'Lista de servicios'
      }
    ]
  };

  beforeEach(waitForAsync(() => {
    const facadeSpy = jasmine.createSpyObj('SupportFacade', [
      'parameterByKey',
      'openExternalLinks'
    ]);

    TestBed.configureTestingModule({
      declarations: [SupportPage],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: SupportFacade,
          useValue: facadeSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    facade = TestBed.inject(SupportFacade) as jasmine.SpyObj<SupportFacade>;

    // Configure default spy behavior BEFORE creating component
    facade.parameterByKey.and.callFake((type: ParameterType) => {
      if (type === ParameterType.helpSitesBm) {
        return of(mockInitialData);
      } else if (type === ParameterType.brebFrequentQuestionsBm) {
        return of(mockSpiData);
      }
      return of({});
    });

    fixture = TestBed.createComponent(SupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize searchControl', () => {
      expect(component.searchControl).toBeInstanceOf(FormControl);
    });

    it('should call facade.parameterByKey for both observables on init', () => {
      expect(facade.parameterByKey).toHaveBeenCalledWith(
        ParameterType.helpSitesBm
      );
      expect(facade.parameterByKey).toHaveBeenCalledWith(
        ParameterType.brebFrequentQuestionsBm
      );
      expect(facade.parameterByKey).toHaveBeenCalledTimes(2);
    });
  });

  describe('openUrl method', () => {
    it('should call facade.openExternalLinks with correct URL', () => {
      const testUrl = 'http://localhost:1000';

      component.openUrl(testUrl);

      expect(facade.openExternalLinks).toHaveBeenCalledWith(testUrl);
      expect(facade.openExternalLinks).toHaveBeenCalledTimes(1);
    });

    it('should handle empty URL', () => {
      component.openUrl('');

      expect(facade.openExternalLinks).toHaveBeenCalledWith('');
    });
  });

  describe('supportDataSpi$ observable', () => {
    it('should filter multiple SPI questions', fakeAsync(async () => {
      component.searchControl.setValue('s'); // Should match multiple questions
      tick(300);

      const filteredData = await firstValueFrom(component.supportDataSpi$);
      expect(filteredData.questions.length).toBeGreaterThan(0);
      expect(
        filteredData.questions.some((q) => q.title.toLowerCase().includes('s'))
      ).toBeTruthy();
    }));
  });

  describe('Search debouncing', () => {
    it('should not debounce empty search term', fakeAsync(() => {
      let emitted = false;
      component.supportData$.subscribe(() => {
        emitted = true;
      });

      component.searchControl.setValue('');
      tick(0); // No debounce for empty string

      expect(emitted).toBeTruthy();
    }));

    it('should debounce non-empty search terms', fakeAsync(() => {
      let resultCount = 0;
      component.supportData$.subscribe(() => {
        resultCount++;
      });

      // Reset counter after initial subscription
      resultCount = 0;

      component.searchControl.setValue('test');
      tick(299); // Just before debounce time
      expect(resultCount).toBe(0);

      tick(1); // Complete debounce time
      expect(resultCount).toBe(1);
    }));
  });
});
