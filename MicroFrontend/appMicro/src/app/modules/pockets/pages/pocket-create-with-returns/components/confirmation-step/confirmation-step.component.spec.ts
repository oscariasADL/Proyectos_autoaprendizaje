import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationStepComponent } from './confirmation-step.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestingModule } from '@testing/testing.module';
import { PocketsFacade } from '@app/modules/pockets/pockets.facade';
import { PocketsFacadeMock } from '@testing/mocks/facade/pockets.facade.mock';

describe('ConfirmationStepComponent', () => {
  let component: ConfirmationStepComponent;
  let fixture: ComponentFixture<ConfirmationStepComponent>;
  let facade: PocketsFacadeMock;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationStepComponent, ImageUrlPipe],
      imports: [TestingModule, ReactiveFormsModule],
      providers: [{ provide: PocketsFacade, useClass: PocketsFacadeMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ConfirmationStepComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(PocketsFacade) as PocketsFacadeMock;

    component.form = new FormGroup({
      name: new FormControl('Test Pocket'),
      category: new FormControl({ label: 'Savings' }),
      product: new FormControl({ idUM: '626334' }),
      goal: new FormControl('1000'),
      periodicity: new FormControl({ label: 'Monthly' }),
      period: new FormControl('30'),
      openAmount: new FormControl('500'),
      quota: new FormControl('10'),
      renewPocket: new FormControl(true),
      renewWithProfits: new FormControl(false)
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the checkForm with "checkTerms" control', () => {
    expect(component.checkForm.contains('checkTerms')).toBeTrue();
    expect(component.checkForm.controls['checkTerms'].valid).toBeFalse();
    component.checkForm.controls['checkTerms'].setValue(true);
    expect(component.checkForm.controls['checkTerms'].valid).toBeTrue();
  });

  it('should disable the button when checkForm is invalid', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTrue();

    component.checkForm.controls['checkTerms'].setValue(true);
    fixture.detectChanges();

    expect(button.nativeElement.disabled).toBeFalse();
  });

  it('should render the correct translated text for title and button', () => {
    const title = fixture.debugElement.query(By.css('h3.title'));
    const button = fixture.debugElement.query(By.css('button'));

    expect(title.nativeElement.textContent).toContain(
      'POCKET_WITH_RETURNS.CREATE.CREATE_TITLE'
    );
    expect(button.nativeElement.textContent).toContain(
      'POCKET_WITH_RETURNS.CONFIRMATION.CREATE_POCKET'
    );
  });

  it('should apply the correct image URL using the imageUrl pipe', () => {
    const image = fixture.debugElement.query(By.css('.pocket-img'));
    expect(image.nativeElement.src).toContain(
      '/assets/images/illustrations/pockets/money-pocket.svg'
    );
  });
  it('should call facade.openExternalLinks with the correct URL', () => {
    const url = 'https://example.com';
    spyOn(facade, 'openExternalLinks');
    component.openUrl(url);
    expect(facade.openExternalLinks).toHaveBeenCalledWith(url);
  });
});
