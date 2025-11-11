import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavController } from '@ionic/angular';

import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { PocketDeleteFacadeMock } from '@testing/mocks/facade/pocket-delete.facade.mock';
import { PocketDetailFacadeMock } from '@testing/mocks/facade/pocket-detail.facade.mock';
import { PocketStatusFacadeMock } from '@testing/mocks/facade/pocket-status.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { PocketActionType } from '../../entities/pocket-action.interface';
import { PocketCategoryPipe } from '../../pipes/pocket-category.pipe';
import { PocketDeleteFacade } from '../pocket-delete/pocket-delete.facade';
import { PocketStatusFacade } from '../pocket-status/pocket-status.facade';
import { PocketDetailFacade } from './pocket-detail.facade';
import { PocketDetailPage } from './pocket-detail.page';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';
import { StripTagsPipe } from '@commons/pipes/strip-tags.pipe';

describe('PocketDetailPage', () => {
  let component: PocketDetailPage;
  let fixture: ComponentFixture<PocketDetailPage>;
  let navControlSpy;
  let activatedRouteMock: any;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot',
      'navigateBack',
      'navigateForward',
      'pop'
    ]);

    activatedRouteMock = {
      snapshot: {
        params: {
          type: 'SPA',
          id_parent: '7904334',
          number: '420'
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        PocketDetailPage,
        CapitalizePipe,
        CurrencyFormatPipe,
        ImageUrlPipe,
        NumberFormatPipe,
        StripTagsPipe
      ],
      imports: [TestingModule, PocketCategoryPipe],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: PocketDetailFacade, useClass: PocketDetailFacadeMock },
        { provide: PocketStatusFacade, useClass: PocketStatusFacadeMock },
        { provide: PocketDeleteFacade, useClass: PocketDeleteFacadeMock },
        { provide: NavController, useValue: navControlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketDetailPage);
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
