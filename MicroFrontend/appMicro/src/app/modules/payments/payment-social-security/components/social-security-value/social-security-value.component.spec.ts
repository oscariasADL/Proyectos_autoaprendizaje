import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { SocialSecurityValueComponent } from './social-security-value.component';

describe('SocialSecurityValueComponent', () => {
  let component: SocialSecurityValueComponent;
  let fixture: ComponentFixture<SocialSecurityValueComponent>;
  const formBuilder: UntypedFormBuilder = new UntypedFormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SocialSecurityValueComponent, CurrencyFormatPipe],
      imports: [TestingModule, IonicModule],
      providers: [{ provide: UntypedFormBuilder, useValue: formBuilder }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialSecurityValueComponent);
    component = fixture.componentInstance;
    component.form = formBuilder.group({
      productOrigin: [null, [Validators.required]],
      contributor: [null, [Validators.required]],
      worksheet: [{ label: '' }, [Validators.required]],
      worksheetActiveType: [null],
      worksheetNumber: [null],
      worksheetDate: [null],
      value: [null, [Validators.required]],
      fee: [null],
      confirmation: [null]
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.amount).toBeUndefined();
    expect(component.worksheetNumber).toBeDefined();
    expect(component.contributor).toBeDefined();
    expect(component.worksheet).toBeDefined();
    const contributor = {
      documentType: '123456',
      documentId: '12345',
      fullName: 'Test Person'
    };
    component.form.patchValue({
      value: { amount: 40000 },
      worksheetNumber: 123456,
      contributor,
      worksheet: { label: 'test' }
    });
    expect(component.amount).toEqual(40000);
    expect(component.worksheetNumber).toEqual(123456);
    expect(component.contributor).toEqual(contributor);
    expect(component.worksheet).toEqual('test');
  });
});
