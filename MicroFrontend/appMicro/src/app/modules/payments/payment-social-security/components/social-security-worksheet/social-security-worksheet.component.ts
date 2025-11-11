import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';
import { mapErrorDescription } from '@commons/helpers/http.helpers';
import { AlertService } from '@commons/services/alert.service';
import { resetControl } from '@commons/utils/forms';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { SOCIAL_SECURITY_MONTH_LIST } from '@modules/payments/payment-social-security/constants/social-security-date.constants';
import { SOCIAL_SECURITY_PIN_ERROR } from '@modules/payments/payment-social-security/constants/social-security.constants';
import { PaymentSocialSecurityWorksheetType } from '@modules/payments/payment-social-security/entities/social-security.interface';
import {
  mapSocialSecurityPinPayload,
  mapSocialSecurityReferencePayload
} from '@modules/payments/payment-social-security/helpers/payment-social-security.helpers';
import { PaymentSocialSecurityFacade } from '@modules/payments/payment-social-security/payment-social-security.facade';
import {
  fetchSocialSecurityDataByPinErrorAction,
  fetchSocialSecurityDataByPinSuccessAction,
  fetchSocialSecurityDataByReferenceErrorAction,
  fetchSocialSecurityDataByReferenceSuccessAction
} from '@modules/payments/payment-social-security/store/payment-social-security.actions';
import { Actions, ofType } from '@ngrx/effects';
import { addYears, getYear, parseISO, subYears } from 'date-fns';
import { merge } from 'rxjs';
import { take } from 'rxjs/operators';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-social-security-worksheet',
  templateUrl: './social-security-worksheet.component.html',
  styleUrls: ['./social-security-worksheet.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialSecurityWorksheetComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() date: string;
  @Input() socialSecurityOperator: DropdownList[];

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public lastYearValues: number[];
  public socialSecurityMonthList: string[] = SOCIAL_SECURITY_MONTH_LIST;

  private months: { text: string; value: string }[] = [
    {
      text: 'Enero',
      value: '01'
    },
    {
      text: 'Febrero',
      value: '02'
    },
    {
      text: 'Marzo',
      value: '03'
    },
    {
      text: 'Abril',
      value: '04'
    },
    {
      text: 'Mayo',
      value: '05'
    },
    {
      text: 'Junio',
      value: '06'
    },
    {
      text: 'Julio',
      value: '07'
    },
    {
      text: 'Agosto',
      value: '08'
    },
    {
      text: 'Septiembre',
      value: '09'
    },
    {
      text: 'Octubre',
      value: '10'
    },
    {
      text: 'Noviembre',
      value: '11'
    },
    {
      text: 'Diciembre',
      value: '12'
    }
  ];

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private facade: PaymentSocialSecurityFacade,
    private pickerCtrl: PickerController
  ) {}

  ngOnInit(): void {
    this.initYears();
  }

  public checkWorksheet(): void {
    if (this.isValidForm) {
      if (this.isHasWorksheet) {
        this.facade.fetchSocialSecurityDataByReference(
          mapSocialSecurityReferencePayload(this.form.value)
        );
      } else {
        this.facade.fetchSocialSecurityDataByPin(
          mapSocialSecurityPinPayload(this.form.value)
        );
      }
      this.listenSocialSecurityResponse();
    }
  }

  public setActiveType(type: PaymentSocialSecurityWorksheetType): void {
    this.worksheetActiveType.setValue(type);

    switch (this.worksheetActiveType.value) {
      case PaymentSocialSecurityWorksheetType.hasWorksheet:
        resetControl(this.worksheetNumber as UntypedFormControl, true);
        resetControl(this.worksheetDate as UntypedFormControl, true);
        break;
      case PaymentSocialSecurityWorksheetType.notWorksheet:
        resetControl(this.worksheetNumber as UntypedFormControl, true);
        this.worksheetDate.setValue(this.date);
        break;
    }
  }

  private initYears(): void {
    this.lastYearValues = [
      getYear(subYears(parseISO(this.date), 1)),
      getYear(parseISO(this.date)),
      getYear(addYears(parseISO(this.date), 1))
    ];
  }

  private listenSocialSecurityResponse(): void {
    merge(
      this.actions$.pipe(ofType(fetchSocialSecurityDataByPinSuccessAction)),
      this.actions$.pipe(ofType(fetchSocialSecurityDataByPinErrorAction)),
      this.actions$.pipe(
        ofType(fetchSocialSecurityDataByReferenceSuccessAction)
      ),
      this.actions$.pipe(ofType(fetchSocialSecurityDataByReferenceErrorAction))
    )
      .pipe(take(1))
      .subscribe((action: any) => {
        switch (action.type) {
          case fetchSocialSecurityDataByReferenceSuccessAction.type:
          case fetchSocialSecurityDataByPinSuccessAction.type:
            if (action?.data?.amount) {
              this.value.setValue({
                ...action.data,
                amount: +action.data.amount
              });
              this.continue.emit();
            } else {
              this.showError(mapErrorDescription(action));
            }
            break;

          case fetchSocialSecurityDataByPinErrorAction.type:
            this.showError(action.message);
            break;

          case fetchSocialSecurityDataByReferenceErrorAction.type:
            this.showError(action.message);
            break;
        }
      });
  }

  private showError(description: string): void {
    this.alertService.create({
      ...SOCIAL_SECURITY_PIN_ERROR,
      description
    });
  }

  get isValidForm(): boolean {
    return (
      this.worksheet.valid &&
      this.worksheetDate.valid &&
      this.worksheetNumber.valid
    );
  }

  get isHasWorksheet(): boolean {
    return this.worksheetActiveType?.value === this.worksheetType.hasWorksheet;
  }

  get isNotWorksheet(): boolean {
    return this.worksheetActiveType?.value === this.worksheetType.notWorksheet;
  }

  get worksheetType(): typeof PaymentSocialSecurityWorksheetType {
    return PaymentSocialSecurityWorksheetType;
  }

  get worksheetActiveType(): AbstractControl {
    return this.form.get('worksheetActiveType');
  }

  get worksheetNumber(): AbstractControl {
    return this.form.get('worksheetNumber');
  }

  get worksheetDate(): AbstractControl {
    return this.form.get('worksheetDate');
  }

  get worksheet(): AbstractControl {
    return this.form.get('worksheet');
  }

  get value(): AbstractControl {
    return this.form.get('value');
  }

  public async openPicker(): Promise<void> {
    const date = new Date();
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'year',
          selectedIndex: 1,
          options: this.lastYearValues.map((year) => ({
            text: year.toString(),
            value: year
          }))
        },
        {
          name: 'month',
          selectedIndex: date.getMonth(),
          options: this.months.map((moth) => ({
            text: moth.text,
            value: moth.value
          }))
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: (value) => {
            resetControl(this.worksheetDate as UntypedFormControl, true);
            this.worksheetDate.setValue(
              `${value.year.text}-${value.month.value}`
            );
          }
        }
      ]
    });

    await picker.present();
  }
}
