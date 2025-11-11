import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LayoutFacadeMock } from '@testing/mocks/facade/layout.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { LayoutFacade } from './layout.facade';
import { LayoutPage } from './layout.page';

describe('LayoutPage', () => {
  let component: LayoutPage;
  let fixture: ComponentFixture<LayoutPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutPage],
      imports: [TestingModule],
      providers: [{ provide: LayoutFacade, useClass: LayoutFacadeMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout', () => {
    expect(component.logout()).toBeUndefined();
  });
});
