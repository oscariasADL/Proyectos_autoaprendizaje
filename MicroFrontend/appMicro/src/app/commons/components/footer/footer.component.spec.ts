import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterFacade } from '@commons/components/footer/footer.facade';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { FooterFacadeMock } from '@testing/mocks/facade/footer.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { FooterComponent } from './footer.component';
import { SubMenuList } from '@modules/layout/entities/tabs.interface';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent, ImageUrlPipe],
      imports: [IonicModule, RouterTestingModule, TestingModule],
      providers: [
        {
          provide: FooterFacade,
          useClass: FooterFacadeMock
        },
        { provide: NavController, useValue: navCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    component.isColorBlack = false;
    component.menuListLeft = [];
    component.menuListRight = [];
    component.principalListItem = {
      label: '',
      icon: 'billete.svg',
      title: '',
      url: [],
      id: '',
      position: 'center'
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call handleClickMenu', async () => {
    const item = { ...component.principalListItem };
    expect(await component.handleClickMenu(item)).toBe(void 0);

    item.url = ['/qr/pay'];
    expect(await component.handleClickMenu(item)).toBe(void 0);
  });

  it('should be call handleClickSubMenu', async () => {
    component.showOptions = true;
    const item: SubMenuList = {
      ...component.principalListItem,
      url: ['/qr/pay']
    };
    expect(await component.handleClickSubMenu(item)).toBe(void 0);
    expect(component.showOptions).toBe(false);
    expect(component.showOptionsDetail).toBe(false);
  });

  it('should be call handleClickSideButton', () => {
    component.showOptions = true;
    component.handleClickSideButton();
    expect(component.showOptions).toBe(false);
    expect(component.showOptionsDetail).toBe(false);
  });
});
