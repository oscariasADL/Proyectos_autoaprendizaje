import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccordionUrlComponent } from './accordion-url.component';
import { TestingModule } from '@testing/testing.module';
import { AlertService } from '@app/commons/services/alert.service';
import { SupportCardQuestion } from '../../constants/support.constants';
import {
  AlertSheetType,
  AlertSheetIcon
} from '@commons/entities/alert/alert-sheet.entities';

describe('AccordionUrlComponent', () => {
  let component: AccordionUrlComponent;
  let fixture: ComponentFixture<AccordionUrlComponent>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  const mockUrls: SupportCardQuestion[] = [
    {
      context: {
        itemSupportCardQuestion: {
          item: ['Test 1', 'https://test1.com']
        }
      }
    }
  ];
  const mockContent = { questions: [] };

  beforeEach(async () => {
    const alertSpy = jasmine.createSpyObj('AlertService', ['create']);

    await TestBed.configureTestingModule({
      imports: [IonicModule, TestingModule],
      declarations: [AccordionUrlComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: AlertService, useValue: alertSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionUrlComponent);
    component = fixture.componentInstance;
    component.urls = mockUrls;
    component.content = mockContent;
    alertServiceSpy = TestBed.inject(
      AlertService
    ) as jasmine.SpyObj<AlertService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get unique url', () => {
    const item = { key: 'Transferencias' };
    expect(component.trackByFunction(0, item)).toBe('Transferencias');
    expect(component.trackByFunction2(0, item)).toBe(0);
  });

  it('should emit openUrl event', () => {
    spyOn(component.openUrl, 'emit');
    const testUrl = 'https://example.com';

    component.openUrl.emit(testUrl);

    expect(component.openUrl.emit).toHaveBeenCalledWith(testUrl);
  });

  it('should call openPopUp with correct parameters', () => {
    const title = 'Test Title';
    const content = 'Test Content';
    alertServiceSpy.create.and.returnValue(Promise.resolve());

    component.openPopUp(title, content);

    expect(alertServiceSpy.create).toHaveBeenCalledWith({
      id: 'alert-breb-support-info',
      type: AlertSheetType.question,
      icon: AlertSheetIcon.brebSupport,
      title: title,
      descriptionHtml: content,
      buttons: ['Entendido']
    });
  });

  it('should handle input properties correctly', () => {
    const mockUrls: SupportCardQuestion[] = [
      {
        context: {
          itemSupportCardQuestion: {
            item: ['Test 1', 'https://test1.com']
          }
        }
      },
      {
        context: {
          itemSupportCardQuestion: {
            item: ['Test 2', 'https://test2.com']
          }
        }
      }
    ];
    const mockContent = { questions: [] };

    component.urls = mockUrls;
    component.content = mockContent;

    expect(component.urls).toEqual(mockUrls);
    expect(component.content).toEqual(mockContent);
  });

  it('should track by function return correct keys', () => {
    const item1 = { key: 'Transferencias' };
    const item2 = { key: 'Pagos' };

    expect(component.trackByFunction(0, item1)).toBe('Transferencias');
    expect(component.trackByFunction(1, item2)).toBe('Pagos');
  });

  it('should track by function2 return correct index', () => {
    const item = { key: 'Test' };

    expect(component.trackByFunction2(0, item)).toBe(0);
    expect(component.trackByFunction2(5, item)).toBe(5);
  });
});
