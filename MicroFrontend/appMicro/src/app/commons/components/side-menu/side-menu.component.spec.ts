import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule } from '@ionic/angular';
import { SideMenuFacadeMock } from '@testing/mocks/facade/side-menu.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { SideMenuComponent } from './side-menu.component';
import { SideMenuFacade } from './side-menu.facade';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';

describe('SideMenuComponent', () => {
  let alertSpy;
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(waitForAsync(() => {
    alertSpy = jasmine.createSpyObj('AlertService', ['create']);
    TestBed.configureTestingModule({
      declarations: [SideMenuComponent, CapitalizePipe],
      imports: [TestingModule, IonicModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: SideMenuFacade, useClass: SideMenuFacadeMock },
        {
          provide: AlertService,
          useValue: alertSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be logout', () => {
    alertSpy.create.and.callFake(async () => true);
    expect(component.version$).toBeTruthy();
    expect(component.logout()).toBeUndefined();
  });

  it('should closeMenu', () => {
    spyOn(component, 'closeMenu').and.callThrough();
    component.closeMenu();
    expect(component.closeMenu).toHaveBeenCalled();
  });
});
