import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PocketWithoutDetailComponent } from './pocket-without-detail.component';
import { CommonModule } from '@angular/common';
import { TestingModule } from '@testing/testing.module';

describe('PocketWithoutDetailComponent', () => {
  let component: PocketWithoutDetailComponent;
  let fixture: ComponentFixture<PocketWithoutDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(PocketWithoutDetailComponent, {
      add: {
        imports: [TestingModule, CommonModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(PocketWithoutDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closePocketDetail when close() is called', () => {
    const closePocketDetailSpy = spyOn(component.closePocketDetail, 'emit');

    component.close();
    expect(closePocketDetailSpy).toHaveBeenCalled();
  });
});
