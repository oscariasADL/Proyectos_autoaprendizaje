import { Injectable, Type } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { AlertService } from '@commons/services/alert.service';
import { Pocket } from '@modules/pockets/entities/pockets.interface';
import { mapPocketDetailPayload } from '@modules/pockets/helpers/pocket.helpers';
import { mapPocketDeleteAlert } from '@modules/pockets/pages/pocket-delete/mappers/pocket-delete.mapper';
import { pocketDeleteAction } from '@modules/pockets/pages/pocket-delete/store/pocket-delete.actions';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';

@Injectable()
export class PocketDeleteFacade extends AppFacade {
  private alertService: AlertService = this.injector.get<AlertService>(
    AlertService as Type<AlertService>
  );

  public deletePocketConfirm(pocket: Pocket): void {
    this.closeToast();
    this.alertService.create(mapPocketDeleteAlert()).then((confirm) => {
      if (!!confirm) {
        this.deletePocketStatus(mapPocketDetailPayload(pocket));
      }
    });
  }

  public deletePocketStatus(payload: PocketDetailPayload): void {
    this.store.dispatch(pocketDeleteAction({ payload }));
  }
}
