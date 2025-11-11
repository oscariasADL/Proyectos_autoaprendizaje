/* eslint-disable max-lines */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { NavController, Platform } from '@ionic/angular';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Observable, Subscription } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';

import { DownloadFacade } from '@commons/components/download/download.facade';
import { ShareFacade } from '@commons/components/share/share.facade';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import {
  AlertSheetIcon,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { ConfigService } from '@commons/services/config.service';
import { removeSubscriptions } from '@commons/utils/util';

import {
  VoucherItem,
  VoucherItemType
} from '../voucher/entities/voucher.entities';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { mapFavoritesData } from '@modules/favorites/mappers/favorites-data.mapper';
import { getDBValue, isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  Favorite,
  FavoritePayload
} from '@modules/favorites/entities/favorites.interface';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { SecureKeys } from '@commons/constants/keys.constants';
import { ALPHABETIC_PATTERN } from '@commons/constants/regex.constants';
import {
  Campaign,
  CampaignPlaces
} from '@modules/marketing-campaigns/entities/marketing-campaigns.interface';
import { TranslateService } from '@ngx-translate/core';
import { mapServicesPayMultipleSuccessResponse } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/mappers/services-pay-multiple-response.mapper';
import { SPI_MF } from '@commons/constants/navigate.constants';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { updateSpiContactAction } from '@modules/transfers/pages/bre-b-transfers/store/bre-b-transfers.actions';

const PDF_WIDTH = 400;

@Component({
  selector: 'app-alert-sheet',
  templateUrl: './alert-sheet.component.html',
  styleUrls: ['./alert-sheet.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlertSheetComponent implements OnInit, OnDestroy {
  @Input() props: AlertSheetProperties;

  public items: VoucherItem[];
  public downloadItems: VoucherItem[];
  public dataVoucherAlt: {
    downloadItems: VoucherItem[];
    props: AlertSheetProperties;
  } = null;
  public ipLoaded: boolean = false;
  public favoriteFormControl: UntypedFormControl = new UntypedFormControl(null);
  public showFavoriteNameField: boolean = false;
  public showSpiFavoriteNameField: boolean = false;
  public favorite: Favorite = undefined;
  private subscriptions: Subscription[] = [];

  hasSuccessButtons: boolean = false;

  constructor(
    private platform: Platform,
    private cdRef: ChangeDetectorRef,
    private modalCtrl: ModalController,
    private shareFacade: ShareFacade,
    private downloadFacade: DownloadFacade,
    private favoritesFacade: FavoritesFacade,
    private conf: ConfigService,
    private secureStorage: AdlSecureStorageService,
    private navCtrl: NavController,
    private translate: TranslateService
  ) {
    this.favoriteFormControl.setValidators([
      Validators.required,
      Validators.pattern(ALPHABETIC_PATTERN),
      Validators.maxLength(
        this.favoritesFacade.boundsByKey(
          ParameterKey.favoritesMaxNicknameLength
        )
      )
    ]);
  }

  ngOnInit(): void {
    this.hasSuccessButtons = this.props.hasSuccessButtons || false;
    this.subscriptions.push(
      this.platform.backButton.subscribeWithPriority(
        BackButtonPriorities.third,
        () => this.closeModal()
      ),
      this.initDownloadItems()
    );
  }

  ngOnDestroy(): void {
    this.cleanAlerts();
    removeSubscriptions(this.subscriptions);
  }

  private initDownloadItems(): Subscription {
    if (isNullOrUndefined(this.props?.items)) {
      return null;
    }
    this.items = [...this.props.items];
    const fromIndex = this.items.findIndex((it) => it.id === 'from');
    if (fromIndex >= 0) {
      const item = this.items[fromIndex];
      const words = item.fields[0].split(' ');
      const num = words.pop();
      this.items[fromIndex] = {
        ...item,
        fields: [`${words.join(' ')} **** ${num.slice(-4)}`]
      };
    }
    return this.conf
      .fetchIP()
      .pipe(
        withLatestFrom(
          this.downloadFacade.deviceInfo$.pipe(
            filter((deviceInfo) => !!deviceInfo)
          ),
          this.downloadFacade.lastTransactionDate$
        )
      )
      .subscribe(([currentIp, { uuid }, lastTransactionDate]) => {
        this.ipLoaded = true;
        const ipItem = currentIp
          ? [
              {
                id: 'my-ip',
                label: 'IP',
                fields: [currentIp]
              }
            ]
          : [];
        this.downloadItems = [
          this.items[0],
          ...this.items.filter(
            (val, i) => i > 0 && val.type !== VoucherItemType.List
          ),
          ...ipItem,
          {
            id: 'my-deviceId',
            label: 'Identificador dispositivo',
            fields: [uuid]
          },
          ...this.items.filter((val) => val.type === VoucherItemType.List)
        ];
        this.downloadFacade.updateLastTransactionDate(null);
        this.cdRef.detectChanges();
      });
  }

  public isEnabledSpiContactBook(): Observable<boolean> {
    return this.downloadFacade.isFeatureFlagEnabled(
      FeatureFlagsKey.SPIContactBook
    );
  }

  private cleanAlerts(): void {
    this.downloadFacade.downloadClean();
    this.shareFacade.shareFileClean();
  }

  public closeModal(data: any = null): void {
    this.cleanAlerts();
    this.modalCtrl.dismiss(data);
    if (this.props.navigateOnCloseUrl) {
      this.navCtrl.navigateForward(this.props.navigateOnCloseUrl);
    }
  }

  public downloadTicket(): void {
    if (!this.workingDownload$.currentValue() && this.ipLoaded) {
      this.cleanAlerts();
      this.downloadFacade.toggleWorkingDownload(true);
      const name = 'comprobante.pdf';
      window.setTimeout(() => {
        const ticketFile = async () => {
          const data = await this.generateFileTicket('voucher-download', name);
          this.downloadFacade.downloadFile({
            name,
            data
          });
        };
        void ticketFile();
      }, 0);
    }
  }

  public shareTicket(): void {
    if (!this.workingShare$.currentValue() && this.ipLoaded) {
      this.cleanAlerts();
      this.shareFacade.toggleWorkingShare(true);
      const name = 'comprobante.pdf';
      window.setTimeout(() => {
        const ticketFile = async () => {
          const data = await this.generateFileTicket('voucher-download', name);
          this.shareFacade.shareFile({
            name,
            data
          });
        };
        void ticketFile();
      }, 0);
    }
  }

  public getDoc(imgHeight: number): any {
    return new jsPDF('p', 'px', [PDF_WIDTH, imgHeight]);
  }

  public async saveOrDeleteFavorite(): Promise<void> {
    if (!this.isFavorite) {
      this.showFavoriteNameField = !this.showFavoriteNameField;
      return;
    }

    const db = await this.secureStorage.getAll();
    const { typeDocument: idUserType, document: idUser } = JSON.parse(
      getDBValue(db, SecureKeys.loginData)
    );
    this.favoritesFacade.showDeleteConfirm({
      userData: { idUserType, idUser },
      idFavoriteTransaction: this.favorite.keyFavorite
    });
  }

  public async saveFavorite(): Promise<void> {
    if (this.favoriteFormControl.valid) {
      const db = await this.secureStorage.getAll();
      const { typeDocument, document } = JSON.parse(
        getDBValue(db, SecureKeys.loginData)
      );
      const favoritePayload: FavoritePayload = {
        userData: {
          idUserType: typeDocument,
          idUser: document
        },
        favoriteTransaction: mapFavoritesData.bind(this)(
          this.favoriteFormControl.value,
          this.props.favoritesData.type,
          this.props.favoritesData.data
        )
      };
      this.favoritesFacade.createFavorite(favoritePayload);
    }
  }

  public redirectToAddSpiContact(): void {
    this.downloadFacade.closeToast();
    void this.navCtrl.navigateForward(SPI_MF, {
      queryParams: {
        routeTo: 'save-into-breb-contact-book',
        key: this.props.spiContactKey
      }
    });
    this.closeModal();
  }

  public saveOrDeleteSpiFavorite(): void {
    if (!this.props.isFavoriteSpiContact) {
      this.showSpiFavoriteNameField = !this.showSpiFavoriteNameField;
      return;
    }
    this.favoritesFacade.dispatch([
      updateSpiContactAction({
        payload: {
          contactKey: this.props.spiContactKey,
          isFav: false
        }
      })
    ]);
  }

  public saveSpiFavorite(): void {
    if (this.favoriteFormControl.valid) {
      this.favoritesFacade.dispatch([
        updateSpiContactAction({
          payload: {
            contactKey: this.props.spiContactKey,
            customName: this.favoriteFormControl.value,
            isFav: true
          }
        })
      ]);
    }
  }

  public actionVoucher(data: any): void {
    // improvement to generic action
    this.dataVoucherAlt = null;
    this.cdRef.detectChanges();

    const downloadItemsFiltered = this.downloadItems.filter(
      (item) => !item.id.includes('transaction-')
    );
    const mapping = mapServicesPayMultipleSuccessResponse(
      { paymentBillList: [data.additionalData] },
      downloadItemsFiltered
    );

    this.dataVoucherAlt = {
      downloadItems: mapping.items,
      props: mapping
    };
    this.cdRef.detectChanges();
    this.downloadFacade.enableLoading();
    const name = 'comprobante.pdf';

    window.setTimeout(() => {
      const ticketFile = async () => {
        const dataFile = await this.generateFileTicket(
          'voucher-download-alt',
          name
        );
        this.downloadFacade.downloadFile({
          name,
          data: dataFile
        });
      };
      void ticketFile();
      this.downloadFacade.disableLoading();
    }, 500);
  }

  private async generateFileTicket(
    idElement: string,
    filename: string
  ): Promise<string> {
    const dataUrl = await this.getImageFile(idElement);
    const dataString = await this.imageToPDF(
      dataUrl.toDataURL('image/jpeg', 1),
      filename
    );
    return dataString.replace(
      `data:application/pdf;filename=${filename};base64,`,
      ''
    );
  }

  private async imageToPDF(dataImg: string, filename: string): Promise<string> {
    const img = await this.loadImage(dataImg).catch();
    const imgPercentage = PDF_WIDTH / img?.width;
    const imgHeight = img?.height * imgPercentage;
    const doc = this.getDoc(imgHeight);
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    doc.addImage(img, 'JPEG', 0, 0, width, height);
    if (!Capacitor.isNativePlatform()) {
      doc.save(filename);
    }
    return doc.output('datauristring', filename);
  }

  private loadImage(src: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  }

  private getImageFile(idElement: string): Promise<HTMLCanvasElement> {
    return html2canvas(document.getElementById(idElement));
  }

  get workingShare$(): Observable<boolean> {
    return this.shareFacade.working$;
  }

  get workingDownload$(): Observable<boolean> {
    return this.downloadFacade.working$;
  }

  get alertSheetType(): typeof AlertSheetType {
    return AlertSheetType;
  }

  get icon(): string {
    return this.props.icon || AlertSheetIcon[this.props.type];
  }

  get downloadCompleted$(): Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    return this.downloadFacade.completed$.pipe(filter((com) => com === false));
  }

  get shareCompleted$(): Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    return this.shareFacade.completed$.pipe(filter((com) => com === false));
  }

  get canBeFavorite(): boolean {
    const favorites: Favorite[] =
      this.favoritesFacade.favorites$.currentValue();
    const maxNumberFavorites = this.favoritesFacade.boundsByKey(
      ParameterKey.favoritesMax
    );
    return (
      !isNullOrUndefined(this.props.favoritesData) &&
      favorites?.length < maxNumberFavorites
    );
  }

  get isFavorite(): boolean {
    if (
      isNullOrUndefined(this.props?.favoritesData?.type) ||
      isNullOrUndefined(this.props?.favoritesData?.data)
    )
      return false;
    const favorites: Favorite[] =
      this.favoritesFacade.favorites$.currentValue();
    const favorite: Favorite =
      mapFavoritesData.bind(this)(
        '',
        this.props.favoritesData.type,
        this.props.favoritesData.data
      ) || null;

    this.favorite = favorites.find(
      (fav) =>
        fav.sourceAccountTransaction.typeAcctTransaction ===
          favorite.sourceAccountTransaction.typeAcctTransaction &&
        fav.sourceAccountTransaction.idAcctTransaction ===
          favorite.sourceAccountTransaction.idAcctTransaction &&
        fav.additionalDataTransaction.subtypeOperation &&
        favorite.additionalDataTransaction &&
        fav.additionalDataTransaction.subtypeOperation.toString() ===
          favorite.additionalDataTransaction.subtypeOperation.toString() &&
        fav.additionalDataTransaction.target ===
          favorite.additionalDataTransaction.target
    );
    return !isNullOrUndefined(this.favorite);
  }

  get marketingCampaign$(): Observable<Campaign> {
    return this.shareFacade.marketingCampaignsByPlace(
      CampaignPlaces.ALERT_SHEET
    );
  }
}
