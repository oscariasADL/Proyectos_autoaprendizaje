import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { OfflineComponent } from './offline.component';
import { LOGIN } from '@app/commons/constants/navigate.constants';
import { TestingModule } from '@testing/testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OfflineComponent', () => {
  let component: OfflineComponent;
  let fixture: ComponentFixture<OfflineComponent>;
  let navController: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    // Crear spy para NavController
    const navControllerSpy = jasmine.createSpyObj('NavController', [
      'navigateForward'
    ]);

    await TestBed.configureTestingModule({
      declarations: [OfflineComponent],
      imports: [TestingModule],
      providers: [{ provide: NavController, useValue: navControllerSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(OfflineComponent);
    component = fixture.componentInstance;
    navController = TestBed.inject(
      NavController
    ) as jasmine.SpyObj<NavController>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component).toBeDefined();
    expect(component['navCtrl']).toBeDefined();
  });

  it('should have returnToLogin method defined', () => {
    expect(typeof component.returnToLogin).toBe('function');
  });

  it('should call navCtrl.navigateForward with LOGIN constant when returnToLogin is called', () => {
    component.returnToLogin();

    expect(navController.navigateForward).toHaveBeenCalledWith(LOGIN);
    expect(navController.navigateForward).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple calls to returnToLogin', () => {
    component.returnToLogin();
    component.returnToLogin();
    component.returnToLogin();

    expect(navController.navigateForward).toHaveBeenCalledTimes(3);
    expect(navController.navigateForward).toHaveBeenCalledWith(LOGIN);
  });
});
