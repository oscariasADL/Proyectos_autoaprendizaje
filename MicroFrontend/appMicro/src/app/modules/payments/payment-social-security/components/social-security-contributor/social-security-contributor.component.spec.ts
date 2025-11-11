import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { SocialSecurityContributorComponent } from './social-security-contributor.component';

describe('SocialSecurityContributorComponent', () => {
  let component: SocialSecurityContributorComponent;
  let fixture: ComponentFixture<SocialSecurityContributorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SocialSecurityContributorComponent, ImageUrlPipe],
      imports: [TestingModule, IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialSecurityContributorComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      contributor: new UntypedFormControl()
    });
    component.contributors = [];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setContributor and closeStepper', () => {
    const documentId = '1234';
    component.setContributor({
      documentId,
      documentType: '',
      fullName: ''
    });
    component.closeStepper();
    expect(component.form.controls.contributor.value.documentId).toEqual(
      documentId
    );
  });
});
