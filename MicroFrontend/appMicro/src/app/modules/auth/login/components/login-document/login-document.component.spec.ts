import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginFacade } from '@modules/auth/login/login.facade';
import { LoginFacadeMock } from '@testing/mocks/facade/login.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { LoginDocumentComponent } from './login-document.component';

describe('LoginDocumentComponent', () => {
  let component: LoginDocumentComponent;
  let fixture: ComponentFixture<LoginDocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginDocumentComponent],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: LoginFacade,
          useClass: LoginFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginDocument', () => {
    expect(component.loginDocument()).toBeTruthy();
  });
});
