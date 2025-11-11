import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfFallbackPage } from './mf-fallback.page';

describe('MfFallbackPage', () => {
  let component: MfFallbackPage;
  let fixture: ComponentFixture<MfFallbackPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MfFallbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
