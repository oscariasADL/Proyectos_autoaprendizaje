import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrutasFavoritasComponent } from './frutas-favoritas.component';

describe('FrutasFavoritasComponent', () => {
  let component: FrutasFavoritasComponent;
  let fixture: ComponentFixture<FrutasFavoritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrutasFavoritasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrutasFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
