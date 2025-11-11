import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { PocketMovementsPage } from './pocket-movements.page';
import { TestingModule } from '@testing/testing.module';
import { PocketMovementsFacade } from '@modules/pockets/pages/pocket-movements/pocket-movements.facade';
import {
  FilterMove,
  PocketMovement
} from '@commons/entities/product/movement.interface';
import {
  MovementType,
  PocketMovementPayload
} from '@modules/pockets/pages/pocket-movements/entities/pocket-movements.interface';
import { POCKET_MOVEMENTS_FILTERS } from './constants/pocket-movements.constants';
import { GroupedMovements } from '@app/modules/product-detail/entities/groups-movement.entity';

describe('PocketMovementsPage', () => {
  let component: PocketMovementsPage;
  let fixture: ComponentFixture<PocketMovementsPage>;
  let pocketMovementsFacadeStub: Partial<PocketMovementsFacade>;

  beforeEach(waitForAsync(() => {
    pocketMovementsFacadeStub = {
      movements$: of([]),
      working: of(false),
      completed$: of(true),
      fetchPocketMovements(payload: PocketMovementPayload) {
        return;
      }
    };

    TestBed.configureTestingModule({
      declarations: [PocketMovementsPage],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: PocketMovementsFacade,
          useValue: pocketMovementsFacadeStub
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketMovementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to setFilter', () => {
    const pocketMovementsFacadeStubSpy = spyOn(
      pocketMovementsFacadeStub,
      'fetchPocketMovements'
    );
    component.setFilter(FilterMove.Down);
    expect(pocketMovementsFacadeStubSpy).toHaveBeenCalled();
  });

  it('should call to fetchMovementsWithFilters', () => {
    const pocketMovementsFacadeStubSpy = spyOn(
      pocketMovementsFacadeStub,
      'fetchPocketMovements'
    );
    component.fetchMovementsWithFilters({
      startDate: '2023-01-08',
      endDate: '2023-02-08'
    });
    expect(pocketMovementsFacadeStubSpy).toHaveBeenCalled();
  });

  it('should be defined movementsDetailParams', () => {
    expect(component.movementsDetailParams).toBeDefined();
  });

  it('should be defined monthsBackward', () => {
    expect(component.monthsBackward).toBeDefined();
  });

  it('should be defined working$', () => {
    expect(component.working$).toBeDefined();
  });

  it('should be defined completed$', () => {
    expect(component.completed$).toBeDefined();
  });

  it('should be defined movementTypeDown', () => {
    expect(component.movementTypeDown).toBeDefined();
  });

  it('should be defined defaultPayload', () => {
    expect(component.defaultPayload).toBeDefined();
  });
  it('should return pocketMovementsFilters', () => {
    expect(component.pocketMovementsFilters).toBe(POCKET_MOVEMENTS_FILTERS);
  });
});
