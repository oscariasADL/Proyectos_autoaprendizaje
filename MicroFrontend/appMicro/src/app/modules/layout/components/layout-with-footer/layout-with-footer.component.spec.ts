import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { LayoutWithFooterComponent } from './layout-with-footer.component';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('LayoutWithFooterComponent', () => {
  let component: LayoutWithFooterComponent;
  let fixture: ComponentFixture<LayoutWithFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutWithFooterComponent],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: AppFacade, useClass: AppFacadeMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutWithFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
