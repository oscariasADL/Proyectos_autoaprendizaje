import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkeletonPocketDetailComponent } from './skeleton-pocket-detail.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

describe('SkeletonPocketDetailComponent', () => {
  let component: SkeletonPocketDetailComponent;
  let fixture: ComponentFixture<SkeletonPocketDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(SkeletonPocketDetailComponent, {
      add: {
        imports: [CommonModule, IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonPocketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
