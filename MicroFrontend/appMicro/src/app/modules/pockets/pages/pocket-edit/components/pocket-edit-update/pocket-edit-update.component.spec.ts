import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PocketEditUpdateComponent } from './pocket-edit-update.component';
import { FormControl, FormGroup } from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { PocketsFacadeMock } from '@testing/mocks/facade/pockets.facade.mock';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';

describe('PocketEditUpdateComponent', () => {
  let component: PocketEditUpdateComponent;
  let fixture: ComponentFixture<PocketEditUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PocketEditUpdateComponent, ImageUrlPipe],
      imports: [TestingModule],
      providers: [
        {
          provide: PocketsFacade,
          useClass: PocketsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketEditUpdateComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      name: new FormControl('Bolsillo'),
      category: new FormControl({ value: 'Ahorros', label: 'Ahorros' }),
      goal: new FormControl(0),
      period: new FormControl('mensual'),
      quota: new FormControl(0)
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined installments', () => {
    expect(component.installments).toBeDefined();
  });

  it('should be defined pocketCategories$', () => {
    expect(component.pocketCategories$).toBeDefined();
  });

  it('should be defined name', () => {
    expect(component.name).toBeDefined();
  });

  it('should be defined category', () => {
    expect(component.category).toBeDefined();
  });

  it('should be defined goal', () => {
    expect(component.goal).toBeDefined();
  });

  it('should be defined period', () => {
    expect(component.period).toBeDefined();
  });

  it('should be defined quota', () => {
    expect(component.quota).toBeDefined();
  });
});
