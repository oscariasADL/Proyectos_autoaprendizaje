import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { TypeAccount } from '@commons/entities/product/type-account';
import { Movement } from '@commons/entities/product/movement.interface';
import { GroupedMovements } from '../../entities/groups-movement.entity';
import { groupMovementsByDate } from '@commons/utils/group-movements-by-date';

@Component({
  selector: 'app-product-detail-movements',
  templateUrl: './product-detail-movements.component.html',
  styleUrls: ['./product-detail-movements.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailMovementsComponent implements OnInit, OnChanges {
  @Input() working: boolean;
  @Input() completed: boolean;
  @Input() movements: Movement[];
  @Input() typeProduct: TypeAccount;

  @Output() moreMovements: EventEmitter<void> = new EventEmitter<void>();

  public movementsTitle: string;
  public groupedMovements: GroupedMovements[] = [];

  ngOnInit(): void {
    const newTitle = [TypeAccount.DLA, TypeAccount.CH].includes(
      this.typeProduct
    )
      ? 'Tus movimientos últimos 6 meses'
      : 'Movimientos últimos 7 días';

    this.movementsTitle = newTitle;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.movements) {
      this.fetchMovements();
    }
  }

  private fetchMovements() {
    this.groupedMovements = groupMovementsByDate(this.movements);
  }
}
