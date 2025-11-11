import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketWithoutMovementsComponent } from './pocket-without-movements.component';
import { CommonModule } from '@angular/common';
import { TestingModule } from '@testing/testing.module';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';

describe('PocketWithoutMovementsComponent', () => {
  let component: PocketWithoutMovementsComponent;
  let fixture: ComponentFixture<PocketWithoutMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PocketWithoutMovementsComponent, ImageUrlPipe],
      imports: [TestingModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketWithoutMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
