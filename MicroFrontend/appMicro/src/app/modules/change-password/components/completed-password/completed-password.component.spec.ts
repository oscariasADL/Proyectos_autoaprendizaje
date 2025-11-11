import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { TestingModule } from '@testing/testing.module';
import { CompletedPasswordComponent } from './completed-password.component';

describe('CompletedPasswordComponent', () => {
  let component: CompletedPasswordComponent;
  let fixture: ComponentFixture<CompletedPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedPasswordComponent, ImageUrlPipe],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
