import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { VirtualCreditCardFrequentQuestionsComponent } from './virtual-credit-card-frequent-questions.component';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule, Platform } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { VirtualCreditCardFacadeMock } from '@testing/mocks/facade/virtual-credit-card.facade.mock';
import { DOCUMENT } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('VirtualCreditCardFrequentQuestionsComponent', () => {
  let component: VirtualCreditCardFrequentQuestionsComponent;
  let fixture: ComponentFixture<VirtualCreditCardFrequentQuestionsComponent>;
  const modalCtrlSpy = jasmine.createSpyObj<ModalController>(['dismiss']);
  let document: Document;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(VirtualCreditCardFrequentQuestionsComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [
          Platform,
          { provide: ModalController, useValue: modalCtrlSpy },
          {
            provide: VirtualCreditCardFacade,
            useClass: VirtualCreditCardFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(
      VirtualCreditCardFrequentQuestionsComponent
    );
    component = fixture.componentInstance;

    document = TestBed.inject(DOCUMENT);

    // Agregar elementos <a> al template de prueba
    fixture.debugElement.nativeElement.innerHTML = `
      <div class="virtual-credit-card-frequent-question-list-content">
        <p><a href="https://example.com/1">Link 1</a></p>
        <p><a href="https://example.com/2">Link 2</a></p>
      </div>
    `;

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

  it('should remove question from questionOpen when it is already open', () => {
    component['questionOpen'] = [0];

    component.toggleQuestion(0);

    expect(component['questionOpen']).not.toContain(0);
    expect(component['questionOpen'].length).toBe(0);
  });

  it('should add click event listeners to anchor tags in ngAfterViewInit', () => {
    const aTags = fixture.debugElement.queryAll(By.css('a'));
    aTags.forEach((aTag) => {
      const spy = spyOn(aTag.nativeElement, 'addEventListener');
      component.ngAfterViewInit();
      expect(spy).toHaveBeenCalledWith('click', jasmine.any(Function));
    });
  });

  it('should remove click event listeners in ngOnDestroy', () => {
    const aTags = fixture.debugElement.queryAll(By.css('a'));
    aTags.forEach((aTag) => {
      const spy = spyOn(aTag.nativeElement, 'removeEventListener');
      component.ngAfterViewInit();
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalledWith('click', jasmine.any(Function));
    });
  });
});
