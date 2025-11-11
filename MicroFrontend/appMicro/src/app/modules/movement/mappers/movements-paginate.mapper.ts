import { IonInfiniteScroll } from '@ionic/angular';
import {
  MovementsDetailPayload,
  MovementsDetailResponse
} from '@modules/movement/entities/movements-detail-payload.entity';

export function updateIonInfiniteScroll(
  payload: MovementsDetailPayload,
  response: MovementsDetailResponse,
  infiniteScroll: IonInfiniteScroll
): void {
  infiniteScroll.complete();
  infiniteScroll.disabled =
    payload.params.page * payload.params.pageSize >= response.totalResults;
}
