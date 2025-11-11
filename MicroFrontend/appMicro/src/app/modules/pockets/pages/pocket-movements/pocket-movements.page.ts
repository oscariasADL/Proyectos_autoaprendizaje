import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { format, subWeeks } from 'date-fns';

import { PocketMovementsFacade } from '@modules/pockets/pages/pocket-movements/pocket-movements.facade';
import {
  MovementType,
  PocketMovementPayload
} from '@modules/pockets/pages/pocket-movements/entities/pocket-movements.interface';
import { DATE_FORMAT_3 } from '@commons/constants/date-format.constants';
import {
  MovementFilter,
  MovementsDetailPayloadParams
} from '@modules/movement/entities/movements-detail-payload.entity';
import {
  POCKET_MOVEMENTS_FILTERS,
  POCKETS_MONTHS_BACKWARD
} from '@modules/pockets/pages/pocket-movements/constants/pocket-movements.constants';
import { FilterMove } from '@commons/entities/product/movement.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { movementFilters } from '@modules/movement/constants/movement.constants';
import { GroupedMovements } from '@modules/product-detail/entities/groups-movement.entity';
import { groupMovementsByDate } from '@commons/utils/group-movements-by-date';

@Component({
  selector: 'app-pocket-movements',
  templateUrl: './pocket-movements.page.html',
  styleUrls: ['./pocket-movements.page.sass']
})
export class PocketMovementsPage implements OnInit {
  @Input() accountType: TypeAccount;
  @Input() idParent: string;
  @Input() pocketId: string;

  public date: Date = new Date();
  public filterSelected: FilterMove = FilterMove.All;
  public movementsFilters: MovementFilter[];

  constructor(private facade: PocketMovementsFacade) {
    this.movementsFilters = movementFilters(this.accountType);
  }

  ngOnInit() {
    this.facade.fetchPocketMovements(this.defaultPayload);
  }

  public setFilter(filter: FilterMove): void {
    this.filterSelected = filter;
    this.fetchMovementsWithFilters({ state: this.filterSelected });
  }

  public fetchMovementsWithFilters(params: MovementsDetailPayloadParams): void {
    if (params) {
      this.facade.fetchPocketMovements({
        ...this.defaultPayload,
        ...params
      });
    }
  }

  get movementsDetailParams(): MovementsDetailPayloadParams {
    return {
      startDate: this.defaultPayload.startDate,
      endDate: this.defaultPayload.endDate
    };
  }

  get monthsBackward(): number {
    return POCKETS_MONTHS_BACKWARD;
  }

  get pocketMovementsFilters(): typeof POCKET_MOVEMENTS_FILTERS {
    return POCKET_MOVEMENTS_FILTERS;
  }

  get movements$(): Observable<GroupedMovements[]> {
    return this.facade.movements$.pipe(
      map((movements) => {
        switch (this.filterSelected) {
          case FilterMove.All:
            return groupMovementsByDate(movements);
          case FilterMove.Down:
            return groupMovementsByDate(
              movements.filter(
                (movement) => movement.type === MovementType.INCOME
              )
            );
          case FilterMove.Up:
            return groupMovementsByDate(
              movements.filter(
                (movement) => movement.type === MovementType.EXPENSE
              )
            );
        }
      })
    );
  }

  get working$(): Observable<boolean> {
    return this.facade.working;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }

  get movementTypeDown(): MovementType {
    return MovementType.EXPENSE;
  }

  get defaultPayload(): PocketMovementPayload {
    return {
      parentIdRelative: this.idParent,
      pocketId: this.pocketId,
      startDate: format(subWeeks(this.date, 1), DATE_FORMAT_3),
      endDate: format(this.date, DATE_FORMAT_3)
    };
  }
}
