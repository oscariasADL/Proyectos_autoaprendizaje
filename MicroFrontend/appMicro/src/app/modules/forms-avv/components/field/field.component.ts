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
import {
  AvvInputType,
  InputModeByType,
  InputType
} from '../../entities/input.interface';

let $idInput = 0;

@Component({
  selector: 'avv-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})
export class FieldComponent implements OnInit, AfterViewInit {
  @ViewChild('avvInput', { static: false }) input: ElementRef;

  @Input() id: string;
  @Input() label: string;
  @Input() control: UntypedFormControl;
  @Input() autocomplete: string = 'off';
  @Input() autoFocus: boolean = false;
  @Input() allowCopy: boolean = false;
  @Input() allowPaste: boolean = false;
  @Input() allowCut: boolean = false;
  @Input() icon: string = null;
  @Input() type: AvvInputType | string = AvvInputType.text;
  @Input() hasBtnInputAction: boolean = false;
  @Input() textBtnInputAction: string = 'ACTIONS.SAVE';

  @Output() clickBtnInputAction: EventEmitter<void> = new EventEmitter<void>();

  public inputType: InputType = InputType.text;

  private emailRegexPattern: any =
    // eslint-disable-next-line max-len
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private textRegexPattern: any = /^[^<]*$/;
  private justTextRegexPattern: any = /^(?! *$)[A-Za-z0-9 ]+$/;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.id === undefined) {
      $idInput = $idInput + 1;
      this.id = 'input-format-' + $idInput.toString();
    }
    this.initInputType();
  }

  ngAfterViewInit(): void {
    this.initInputMode();

    if (this.autoFocus) {
      setTimeout(() => document.getElementById(this.id).focus(), 100);
    }
  }

  public keyUp(event: KeyboardEvent): void {
    if (event.key === KeyboardKey.Enter) {
      this.input.nativeElement.blur();
    }
  }

  private initInputMode(): void {
    if (
      !isNullOrUndefined(this.input) &&
      !isNullOrUndefined(this.input.nativeElement)
    ) {
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
      default:
        this.control.setValidators([
          ...(this.control.validator ? [this.control.validator] : []),
          Validators.pattern(this.textRegexPattern),
          Validators.pattern(this.justTextRegexPattern)
        ]);
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
}
