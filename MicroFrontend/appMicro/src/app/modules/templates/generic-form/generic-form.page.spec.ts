import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@commons/controllers/modal.controller';
import { FeeService } from '@commons/services/fee.service';
import { IonicModule } from '@ionic/angular';
import { GenericFormFacadeMock } from '@testing/mocks/facade/generic-form.facade.mock';
import { of } from 'rxjs';
import { FieldType, TemplateType } from './entitites/generic-form.data';
import { GenericFormFacade } from './generic-form.facade';
import { GenericFormPage } from './generic-form.page';

describe('GenericFormPage', () => {
  let modalSpy, modalCtrlSpy, feeSpy;
  let component: GenericFormPage;
  let fixture: ComponentFixture<GenericFormPage>;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', ['present', 'onDidDismiss']);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    feeSpy = jasmine.createSpyObj('FeeService', ['fetchCost']);
    TestBed.configureTestingModule({
      declarations: [GenericFormPage],
      imports: [IonicModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                data: {
                  id: 'miId',
                  feePayload: () => ({}),
                  template: [],
                  voucher: () => ({})
                }
              }
            }
          }
        },
        {
          provide: GenericFormFacade,
          useClass: GenericFormFacadeMock
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: FeeService,
          useValue: feeSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call confirmAction', () => {
    modalSpy.onDidDismiss.and.callFake(async () => ({
      data: true
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    feeSpy.fetchCost.and.callFake(() =>
      of({
        id: 123,
        code: '1234',
        amount: 1000
      })
    );
    const form = {
      type: TemplateType.account,
      form: new UntypedFormBuilder().group({
        fee: [null],
        costGmf: [null],
        confirmation: [null]
      })
    };
    expect(component.confirmAction(form)).toBeTruthy();
    expect(component.id).toEqual('miId');
    expect(component.fieldType.dropdown).toEqual(FieldType.dropdown);
    expect(component.templateType.account).toEqual(TemplateType.account);
  });
});
