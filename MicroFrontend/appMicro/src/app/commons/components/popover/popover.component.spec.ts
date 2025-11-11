import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;
  const popoverCtrl = jasmine.createSpyObj<PopoverController>([
    'create',
    'dismiss'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PopoverComponent],
      imports: [IonicModule, TestingModule],
      providers: [{ provide: PopoverController, useValue: popoverCtrl }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal()', async () => {
    expect(await component.closePopover()).toBeUndefined();
  });
});
