import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { NavController } from '@ionic/angular';
import { PocketDeleteFacadeMock } from '@testing/mocks/facade/pocket-delete.facade.mock';
import { PocketDetailFacadeMock } from '@testing/mocks/facade/pocket-detail.facade.mock';
import { PocketStatusFacadeMock } from '@testing/mocks/facade/pocket-status.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { PocketActionType } from '../../entities/pocket-action.interface';
import { PocketCategoryPipe } from '../../pipes/pocket-category.pipe';
import { PocketDeleteFacade } from '../pocket-delete/pocket-delete.facade';
import { PocketStatusFacade } from '../pocket-status/pocket-status.facade';
import { PocketDetailWithReturnsFacade } from './pocket-detail-with-returns.facade';
import { PocketDetailWithReturnsPage } from './pocket-detail-with-returns.page';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';
import { StripTagsPipe } from '@commons/pipes/strip-tags.pipe';

describe('PocketDetailWithReturnsPage', () => {
  let component: PocketDetailWithReturnsPage;
  let fixture: ComponentFixture<PocketDetailWithReturnsPage>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot',
      'navigateBack',
      'navigateForward',
      'pop'
    ]);

    TestBed.configureTestingModule({
      declarations: [
        PocketDetailWithReturnsPage,
        CapitalizePipe,
        CurrencyFormatPipe,
        ImageUrlPipe,
        NumberFormatPipe,
        StripTagsPipe
      ],
      imports: [TestingModule, PocketCategoryPipe],
      providers: [
        {
          provide: PocketDetailWithReturnsFacade,
          useClass: PocketDetailFacadeMock
        },
        { provide: PocketStatusFacade, useClass: PocketStatusFacadeMock },
        { provide: PocketDeleteFacade, useClass: PocketDeleteFacadeMock },
        { provide: NavController, useValue: navControlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketDetailWithReturnsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call ionView events', () => {
    expect(component.ionViewWillEnter).toBeDefined();
    expect(component.closePocketDetail).toBeDefined();
  });

  it('should be call runAction', () => {
    spyOn(component, 'runAction').and.callThrough();
    Object.keys(PocketActionType).forEach((key) =>
      fixture.ngZone.run(() =>
        expect(component.runAction(PocketActionType[key])).toBeUndefined()
      )
    );
  });

  it('should be call all gets', () => {
    expect(component.periodicity$).toBeTruthy();
    expect(component.pocketStatus).toBeTruthy();
    expect(component.pocketActionType).toBeTruthy();
  });
});
