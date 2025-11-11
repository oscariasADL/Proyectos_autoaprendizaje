import {
  FilterMove,
  Movement
} from '@commons/entities/product/movement.interface';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import assign from 'lodash/assign';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { MovementsDetailPayload } from '../entities/movements-detail-payload.entity';

function mapIcon(category: string): string {
  let iconUrl = 'icon-otros';

  switch (category) {
    case '1':
      iconUrl = 'icon-acciones_productos_financieros';
      break;
    case '2':
      iconUrl = 'icon-avances';
      break;
    case '3':
      iconUrl = 'icon-compras';
      break;
    case '4':
      iconUrl = 'icon-depositos';
      break;
    case '5':
      iconUrl = 'icon-gastos_financieros';
      break;
    case '6':
      iconUrl = 'icon-giros_y_transferencias';
      break;
    case '7':
      iconUrl = 'icon-maleta';
      break;
    case '10':
      iconUrl = 'icon-otros_gastos';
      break;
    case '11':
      iconUrl = 'icon-otros-ingresos';
      break;
    case '12':
      iconUrl = 'icon-pagos';
      break;
    case '13':
      iconUrl = 'icon-retiro';
      break;
    case '14':
      iconUrl = 'icon-salario';
      break;
    case '15':
      iconUrl = 'icon-giros_y_transferencias';
      break;
    default:
      iconUrl = 'icon-otros';
  }
  return iconUrl;
}

function mapMovements(movements: Movement[], filter: FilterMove): Movement[] {
  if (!!!movements) {
    return null;
  }

  return movements
    .map((movement) =>
      assign({
        ...movement,
        icon: mapIcon(movement.category)
      })
    )
    .filter(
      (movement: Movement) =>
        filter === FilterMove.All || movement.state === filter
    )
    .sort(
      (a: Movement, b: Movement) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

function hasAddenda(movement: Movement): boolean {
  return (
    !isNullOrUndefinedOrEmpty(movement.invoiceNumber) ||
    !isNullOrUndefinedOrEmpty(movement.note)
  );
}

export function mapMovement(movement: Movement): Movement {
  if (isNullOrUndefined(movement)) {
    return null;
  }

  return {
    ...movement,
    icon: mapIcon(movement.category),
    hasAddenda: hasAddenda(movement)
  };
}

export function mapMovementsPayload(
  payload: MovementsDetailPayload
): MovementsDetailPayload {
  const _payload = JSON.parse(JSON.stringify(payload));
  if (_payload.params.state === FilterMove.All) {
    delete _payload.params.state;
  }
  return _payload;
}
