import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { CellPhoneListComponent } from './cell-phone-list.component';

describe('CellPhoneListComponent', () => {
  let component: CellPhoneListComponent;
  let fixture: ComponentFixture<CellPhoneListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CellPhoneListComponent],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CellPhoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call ngOnDestroy', () => {
    expect(component.ngOnDestroy()).toBeUndefined();
  });
});
