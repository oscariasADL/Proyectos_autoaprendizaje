import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SHOULD_SHOW_RATE } from '@commons/entities/product/balance.interface';
import {
  FilterMove,
  Movement
} from '@commons/entities/product/movement.interface';
import { mapMovement } from '@modules/movement/mappers/movements.mapper';

@Component({
  selector: 'app-movement-item',
  templateUrl: './movement-item.component.html',
  styleUrls: ['./movement-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementItemComponent {
  private _movement: Movement;

  get movement(): Movement {
    return this._movement;
  }

  @Input()
  set movement(movement: Movement) {
    this._movement = mapMovement(movement);
  }

  get shouldShowRate(): boolean {
    return SHOULD_SHOW_RATE.includes(this._movement.typeAccount);
  }

  get filterMoveDown(): FilterMove {
    return FilterMove.Down;
  }
}
