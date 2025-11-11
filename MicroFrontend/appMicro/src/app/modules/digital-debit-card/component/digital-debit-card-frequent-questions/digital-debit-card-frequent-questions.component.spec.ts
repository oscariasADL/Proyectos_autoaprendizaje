import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, Platform } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { DigitalDebitCardFrequentQuestionsComponent } from './digital-debit-card-frequent-questions.component';
import { ModalController } from '@commons/controllers/modal.controller';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { DigitalDebitCardFacadeMock } from '@testing/mocks/facade/digital-debit-card.facade.mock';
import { BehaviorSubject } from 'rxjs';

describe('DigitalDebitCardFrequentQuestionsComponent', () => {
  let component: DigitalDebitCardFrequentQuestionsComponent;
  let fixture: ComponentFixture<DigitalDebitCardFrequentQuestionsComponent>;
  const modalCtrlSpy = jasmine.createSpyObj<ModalController>(['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(DigitalDebitCardFrequentQuestionsComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [
          Platform,
          { provide: ModalController, useValue: modalCtrlSpy },
          {
            provide: DigitalDebitCardFacade,
            useClass: DigitalDebitCardFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(
      DigitalDebitCardFrequentQuestionsComponent
    );
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal()', async () => {
    expect(component.closeModal()).toBe(void 0);
  });

  it('should call toggleQuestion(questionIndex: number)', () => {
    spyOnProperty(component, 'questions$').and.returnValue(
      new BehaviorSubject([
        {
          question: 'q1',
          answer: 'a1'
        },
        { question: 'q2', answer: 'a2' }
      ])
    );
    component.toggleQuestion(0);
    expect(component['questionOpen'].length).toEqual(1);
  });

  it('should call ngOnDestroy', () => {
    const componentAny = component as any;
    componentAny.subscription = null;
    expect(componentAny.ngOnDestroy()).toBeUndefined();
  });
  it('should remove question index when toggling an already open question', () => {
    spyOnProperty(component, 'questions$').and.returnValue(
      new BehaviorSubject([
        {
          question: 'q1',
          answer: 'a1'
        },
        {
          question: 'q2',
          answer: 'a2'
        }
      ])
    );

    component.toggleQuestion(0);
    expect((component as any).questionOpen.length).toBe(1);

    component.toggleQuestion(0);

    const questionOpen = (component as any).questionOpen;
    expect(questionOpen.length).toBe(0);
    expect(questionOpen).not.toContain(0);
  });
  it('should handle anchor tag click correctly', () => {
    const mockHref = 'https://test.com';
    const mockAnchorElement = {
      href: mockHref
    } as HTMLAnchorElement;

    const mockEvent = {
      preventDefault: jasmine.createSpy('preventDefault')
    } as unknown as MouseEvent;

    const facade = (component as any).facade;
    spyOn(facade, 'openExternalLinks');
    spyOn(component, 'closeModal');

    const handler = (component as any).handleClickAnchorTag(mockAnchorElement);
    handler(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(facade.openExternalLinks).toHaveBeenCalledWith(mockHref);
    expect(component.closeModal).toHaveBeenCalled();
  });
});
