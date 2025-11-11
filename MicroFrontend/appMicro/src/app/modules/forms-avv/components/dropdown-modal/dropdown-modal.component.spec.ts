import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { DropdownModalComponent } from './dropdown-modal.component';
import { ModalControllerMock } from '@testing/mocks/services/modal.controller.mock';
import { ModalController } from '@commons/controllers/modal.controller';

describe('DropdownModalComponent', () => {
  let component: DropdownModalComponent;
  let fixture: ComponentFixture<DropdownModalComponent>;
  let modalController: ModalController;
  let modalSpy;

  const control: UntypedFormControl = new UntypedFormControl({ label: '' });

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [DropdownModalComponent],
      providers: [{ provide: ModalController, useClass: ModalControllerMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownModalComponent);
    modalController = TestBed.inject(ModalController);
    component = fixture.componentInstance;
    component.control = control;
    component.list = [];
    component.id = 'dropdown-test';
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
    const createModalController = spyOn(modalController, 'create');
    modalSpy.onWillDismiss.and.returnValue({ data: null, role: 'selected' });
    createModalController.and.callFake(() => {
      return modalSpy;
    });

    spyOn(component, 'touchEnd').and.callThrough();
    component.touchEnd();
    expect(component.touchEnd).toHaveBeenCalled();
  });

  it('should touchEnd onEnterKey false', () => {
    component.disabled = false;
    component.loading = false;
    component.setIsFocused(true);
    const createModalController = spyOn(modalController, 'create');
    modalSpy.onWillDismiss.and.returnValue({ data: null, role: 'selected' });
    createModalController.and.callFake(() => {
      return modalSpy;
    });
    spyOn(component, 'touchEnd').and.callThrough();
    component.touchEnd();
    expect(component.touchEnd).toHaveBeenCalled();
  });
});
