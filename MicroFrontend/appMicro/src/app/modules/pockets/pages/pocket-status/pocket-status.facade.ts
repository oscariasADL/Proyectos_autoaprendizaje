import { Injectable, Type } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { AlertService } from '@commons/services/alert.service';
import { UpdatePocketPayload } from '@modules/pockets/entities/pocket-update.interface';
import { Pocket } from '@modules/pockets/entities/pockets.interface';
import { mapPocketDetailPayload } from '@modules/pockets/helpers/pocket.helpers';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import {
  mapPocketStatusAlert,
  mapPocketStatusPayload
} from '@modules/pockets/pages/pocket-status/mappers/pocket-status.mapper';
import { updatePocketStatusAction } from '@modules/pockets/pages/pocket-status/store/pocket-status.actions';

@Injectable()
export class PocketStatusFacade extends AppFacade {
  private alertService: AlertService = this.injector.get<AlertService>(
    AlertService as Type<AlertService>
  );

  public updatePocketConfirm(pocket: Pocket): void {
    this.closeToast();
    this.alertService.create(mapPocketStatusAlert(pocket)).then((confirm) => {
      if (!!confirm) {
        this.updatePocketStatus(
          mapPocketStatusPayload(pocket),
          mapPocketDetailPayload(pocket)
        );
      }
    });
  }

  public updatePocketStatus(
    payload: UpdatePocketPayload,
    detail: PocketDetailPayload
  ): void {
    this.store.dispatch(updatePocketStatusAction({ payload, detail }));
  }
}
