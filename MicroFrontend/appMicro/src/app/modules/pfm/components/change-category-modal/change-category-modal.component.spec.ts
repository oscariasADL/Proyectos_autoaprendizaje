import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UntypedFormBuilder } from '@angular/forms';

import { ChangeCategoryModalComponent } from './change-category-modal.component';
import { TestingModule } from '@testing/testing.module';
import { PFMCategoryType } from '@modules/pfm/entities/pfm.interface';
import { ModalController } from '@commons/controllers/modal.controller';

describe('ChangeCategoryModalComponent', () => {
  let component: ChangeCategoryModalComponent;
  let fixture: ComponentFixture<ChangeCategoryModalComponent>;
  const formBuilder: UntypedFormBuilder = new UntypedFormBuilder();
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeCategoryModalComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: UntypedFormBuilder, useValue: formBuilder },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeCategoryModalComponent);
    component = fixture.componentInstance;
    component.categories = [
      { code: '435', name: 'Viajes' },
      { code: '626', name: 'hobbies' },
      { code: '345', name: 'Moments' }
    ];
    component.categoryType = PFMCategoryType.INCOME;
    component.categoryCode = '345';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call changeCategory()', async () => {
    component.newCategoryCode.setValue('626');
    expect(await component.changeCategory()).toBeUndefined();
  });

  it('should be call closeModal()', async () => {
    expect(await component.closeModal()).toBeUndefined();
  });

  it('should be defined newCategoryCode', () => {
    expect(component.newCategoryCode).toBeDefined();
  });

  it('should be defined pfmCategoryType', () => {
    expect(component.pfmCategoryType).toBeDefined();
  });
});
