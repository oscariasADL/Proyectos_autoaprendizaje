import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludoComponent } from './saludo.component';

describe('SaludoComponent', () => {
  let component: SaludoComponent;
  let fixture: ComponentFixture<SaludoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SaludoComponent]
    });
    fixture = TestBed.createComponent(SaludoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
