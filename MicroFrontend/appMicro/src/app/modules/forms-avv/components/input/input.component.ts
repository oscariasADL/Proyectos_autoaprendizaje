import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { KeyboardKey } from '@commons/constants/keyboard.constants';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { srcImgFranchise } from '@modules/product/helpers/product.helper';
import {
  AvvInputType,
  GroupStyle,
  InputModeByType,
  InputType
} from '../../entities/input.interface';

let $idInput = 0;

@Component({
  selector: 'avv-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit, AfterViewInit {
  @ViewChild('avvInput', { static: false }) input: ElementRef;

  @Input() id: string;
  @Input() label: string;
  @Input() control: UntypedFormControl;
  @Input() autocomplete: string = 'off';
  @Input() autoFocus: boolean = false;
  @Input() allowCopy: boolean = false;
  @Input() allowPaste: boolean = false;
  @Input() allowCut: boolean = false;
  @Input() prefix: string = '$ ';
  @Input() icon: string | null = null;
  @Input() preserveIcon: boolean = false;
  @Input() numeralDecimalScale: number = 0;
  @Input() phoneRegionCode: string = 'CO';
  @Input() type: AvvInputType | string = AvvInputType.text;
  @Input() numeralThousandsGroupStyle: GroupStyle = GroupStyle.thousand;
  @Input() franchiseIcon: boolean = false;
  @Input() keepIcon: boolean = false;
  @Input() hint: string = '';
  @Output() focusEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() blurEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() keyUpEvent: EventEmitter<string> = new EventEmitter<string>();

  public showValidations: boolean = false;
  public inputType: InputType = InputType.text;
  public mask: string = '';
  public maskConfig = {
    decimalMarker: ',',
    specialCharacters: [',', '.', ' ', '/'],
    allowNegativeNumbers: false,
    prefix: '',
    suffix: '',
    thousandSeparator: '.',
    precision: 0
  };

  public dropSpecialCharacters: boolean | string[] = true;
  public showMaskTyped: boolean = false;
  public placeHolderCharacter: string = '_';
  public shownMaskExpression: string = '';
  public clearIfNotMatch: boolean = false;
  public validation: boolean = true;

  formattedNumber: string;

  public convertToText(value: string) {
    if (value) {
      this.formattedNumber = value.toString();
    }
  }

  private baseMaskCfg() {
    return {
      thousandSeparator: '.',
      decimalMarker: ',',
      specialCharacters: [',', '.', ' ', '/'],
      allowNegativeNumbers: false,
      prefix: '',
      suffix: '',
      precision: 0
    };
  }

  private normalizeCurrencyValue(raw: unknown): number | null {
    if (raw == null || raw === '') return null;
    if (typeof raw === 'number') return raw;

    const s = String(raw).trim();
    const normalized = s.replace(/\./g, '').replace(',', '.');
    const num = Number(normalized);
    return Number.isFinite(num) ? num : null;
  }

  public initMask(): void {
    this.dropSpecialCharacters = false;
    this.showMaskTyped = false;
    this.clearIfNotMatch = false;
    this.validation = true;
    this.maskConfig = this.baseMaskCfg();
    switch (this.type) {
      case AvvInputType.currency: {
        const decimals = Math.max(0, Number(this.numeralDecimalScale ?? 2));
        this.mask = `separator.${decimals}`;

        break;
      }

      case AvvInputType.numeric:
      case AvvInputType.secretNumber:
        this.mask = '0*';
        this.dropSpecialCharacters = false;
        break;

      case AvvInputType.phone:
        this.mask = '000 000 0000';
        this.showMaskTyped = false;
        this.maskConfig.specialCharacters = [' '];
        break;

      case AvvInputType.document:
        this.maskConfig.allowNegativeNumbers = false;
        this.mask = 'separator.0';
        this.dropSpecialCharacters = true;
        this.showMaskTyped = false;
        this.clearIfNotMatch = false;
        this.validation = false;

        this.maskConfig = {
          ...this.baseMaskCfg(),
          thousandSeparator: '.',
          decimalMarker: '',
          allowNegativeNumbers: false,
          precision: 0
        };
        break;

      case AvvInputType.creditCard:
        this.mask = '0000 0000 0000 0000';
        this.showMaskTyped = false;
        this.maskConfig.specialCharacters = [' '];
        break;

      case AvvInputType.creditCardExpiration:
        this.mask = '00/00';
        this.showMaskTyped = false;
        this.maskConfig.specialCharacters = ['/'];
        break;

      case AvvInputType.creditCardCvc:
        this.mask = '000';
        this.showMaskTyped = false;
        break;

      default:
        this.mask = '';
    }
  }

  private emailRegexPattern: any =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.type === AvvInputType.currency) {
      const n = this.normalizeCurrencyValue(this.control.value);
      if (n !== null) {
        this.control.setValue(n, { emitEvent: false });
      }
    }
    this.control.markAsDirty();
    if (this.id === undefined) {
      $idInput = $idInput + 1;
      this.id = 'input-format-' + $idInput.toString();
    }
    if (this.type === AvvInputType.currency) {
      const n = this.normalizeCurrencyValue(this.control.value);
      if (n !== null) {
        this.control.setValue(n, { emitEvent: false });
      }
    }
    this.initInputType();
    this.initMask();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.control.markAsPristine();
      this.control.updateValueAndValidity();
      this.showValidations = true;
    }, 200);
    this.initInputMode();

    if (this.autoFocus) {
      setTimeout(() => document.getElementById(this.id)?.focus(), 500);
    }
  }

  public keyUp(event: KeyboardEvent): void {
    if (event.key === KeyboardKey.Enter) {
      this.input.nativeElement.blur();
    }
    (event.target as HTMLInputElement).value = (
      event.target as HTMLInputElement
    ).value.toString();
    this.keyUpEvent.emit((event.target as HTMLInputElement).value);
  }

  private initInputMode(): void {
    if (this.input && this.input.nativeElement) {
      this.renderer.setAttribute(
        this.input.nativeElement,
        'inputmode',
        InputModeByType[this.type]
      );
    }
  }

  private initInputType(): void {
    switch (this.type) {
      case AvvInputType.email:
        this.control.setValidators(Validators.pattern(this.emailRegexPattern));
        this.inputType = InputType.email;
        break;
      case AvvInputType.password:
      case AvvInputType.secretNumber:
        this.inputType = InputType.password;
        break;
      case AvvInputType.number:
        this.inputType = InputType.number;
        break;
      case AvvInputType.creditCardCvc:
      case AvvInputType.creditCardExpiration:
        this.inputType = InputType.tel;
        break;
      default:
        this.inputType = InputType.text;
    }
  }

  get isErrorMessage(): boolean {
    return (
      this.control.invalid &&
      (this.control.dirty || this.control.touched) &&
      this.control.errors !== null &&
      Object.keys(this.control.errors).length > 0 &&
      !this.control.pending
    );
  }

  get isCurrencyNotEmpty(): boolean {
    return (
      !isNullOrUndefined(this.control.value) &&
      this.control.value.toString().trim().length > 0 &&
      this.type === AvvInputType.currency
    );
  }

  get srcImgFranchise(): string {
    return srcImgFranchise(this.control.value);
  }

  get inputTypes(): typeof AvvInputType {
    return AvvInputType;
  }
}
