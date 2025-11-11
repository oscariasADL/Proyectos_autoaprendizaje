import { Injectable } from '@angular/core';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import {
  getDBValue,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty,
  sleep
} from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AlertService } from '@commons/services/alert.service';
import { removeProperties } from '@commons/utils/util';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  constructor(
    private alertService: AlertService,
    private secureStorage: AdlSecureStorageService
  ) {}

  public async showPanelIfNecessary(
    props: AlertSheetProperties,
    returnOriginalData: boolean = false
  ): Promise<boolean | null> {
    const db = await this.secureStorage.getAll();
    const isHiddenPanel = !isNullOrUndefinedOrEmpty(
      getDBValue(db, props?.panelKey)
    );

    if (!isHiddenPanel) {
      await sleep(100);
      const data = await this.alertService.create(props);
      await this.secureStorage.put(props?.panelKey, 'notShowAgain', true);
      return returnOriginalData ? data : !isNullOrUndefined(data);
    }
    return null;
  }

  public async showPanel(
    props: AlertSheetProperties,
    utagCategory: string | null = null,
    utag: string | null = null
  ): Promise<any> {
    const _props = props;
    _props.utagCategory = utagCategory;
    _props.utag = utag;
    return this.alertService.create(_props);
  }
}
