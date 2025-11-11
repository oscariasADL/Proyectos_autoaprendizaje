import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { AvalProductsPanelComponent } from './aval-products-panel.component';

describe('AvalProductsPanelComponent', () => {
  let component: AvalProductsPanelComponent;
  let fixture: ComponentFixture<AvalProductsPanelComponent>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    TestBed.configureTestingModule({
      declarations: [AvalProductsPanelComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [{ provide: NavController, useValue: navControlSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AvalProductsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigateTo', () => {
    expect(component.navigateTo({ url: '' } as any)).toBeUndefined();
  });

  it('should call toggleActive', async () => {
    await component.toggleActive(true);
    expect(component.isActive).toBeTrue();
  });
});
