import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeadersFacade } from '@commons/components/headers/headers.facade';
import { HeaderType } from '@commons/entities/header/header.interface';
import { IonicModule, MenuController } from '@ionic/angular';
import { HeadersFacadeMock } from '@testing/mocks/facade/headers.facade.mock';
import { HeadersComponent } from './headers.component';

describe('HeadersComponent', () => {
  let component: HeadersComponent;
  let fixture: ComponentFixture<HeadersComponent>;
  const menuCtrlSpy = jasmine.createSpyObj('MenuController', ['open']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeadersComponent],
      imports: [IonicModule, RouterTestingModule],
      providers: [
        {
          provide: HeadersFacade,
          useClass: HeadersFacadeMock
        },
        { provide: MenuController, useValue: menuCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openMenu(enuId: string)', () => {
    spyOn(component, 'openMenu').and.callThrough();
    component.openMenu('899');
    expect(component.openMenu).toHaveBeenCalled();
  });

  it('should call close', () => {
    component.basicData$.subscribe();
    expect(component.close()).toBeUndefined();
    expect(component.headerType.redFive).toEqual(HeaderType.redFive);
  });

  it('should backgroundColor', () => {
    component.type = HeaderType.whitePrimary;
    expect(component.backgroundColor).toEqual('white');
  });
});
