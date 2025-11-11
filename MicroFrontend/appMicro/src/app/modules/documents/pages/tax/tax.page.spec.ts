import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaxPage } from './tax.page';
import { TestingModule } from '@testing/testing.module';

describe('TaxPage', () => {
  let component: TaxPage;
  let fixture: ComponentFixture<TaxPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxPage],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
