import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { TestingModule } from '@testing/testing.module';

import { AddFavoriteCardComponent } from './add-favorite-card.component';

describe('AddFavoriteCardComponent', () => {
  let component: AddFavoriteCardComponent;
  let fixture: ComponentFixture<AddFavoriteCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(AddFavoriteCardComponent, {
      add: {
        imports: [TestingModule, CommonModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(AddFavoriteCardComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onClick', () => {
    spyOn(component['cardClicked'], 'emit');

    component.onClick();

    expect(component.cardClicked.emit).toHaveBeenCalled();
  });
});
