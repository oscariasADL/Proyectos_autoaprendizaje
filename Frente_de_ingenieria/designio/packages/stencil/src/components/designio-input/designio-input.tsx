import {
  Input as BoccInput,
  FIELD_STATUS
} from '@avaldigitallabs/adl-commons-design-system-frontend-bocc-designio/dist/loader';
import { AutocompleteToken } from '@avaldigitallabs/adl-commons-design-system-frontend-bpop-designio/dist/loader';
import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { DesignioInputType } from './designio-input-type.enum';

@Component({
  tag: 'designio-input',
  styleUrl: 'designio-input.scss',
  shadow: true
})
export class DesignioInput {
  /**
   * Entity for the input
   */
  @Prop() entity: 'bocc' | 'bpop' | 'bavv' | 'bbog' = 'bbog';

  /**
   * The type of input (e.g., text, password, email, number, etc.).
   */
  @Prop() type: DesignioInputType = DesignioInputType.Text;

  /**
   * Label text displayed with the input field.
   */
  @Prop() label: string = '';

  /**
   * The value of the input.
   */
  @Prop() value: string = '';

  /**
   * The placeholder text displayed when the input is empty.
   */
  @Prop() placeholder: string = '';

  /**
   * The ID attribute of the input.
   */
  @Prop() idProp: string = '';

  /**
   * The name attribute of the input.
   */
  @Prop() name: string = '';

  /**
   * Whether the input is disabled for BAVV, BPOP or BOCC. It doesn't apply to BBOG.
   * For BBOG please use the bbogStatus property
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether the input is readonly.
   */
  @Prop() readonly: boolean = false;

  /**
   * Whether the input is required.
   */
  @Prop() required: boolean = false;

  /**
   * The minimum value (for number/date inputs).
   */
  @Prop() min?: string | number;

  /**
   * The maximum value (for number/date inputs).
   */
  @Prop() max?: string | number;

  /**
   * The autocomplete attribute.
   */
  @Prop() autocomplete: string = 'off';

  /**
   * The pattern attribute for regex validation.
   */
  @Prop() pattern?: string;

  /**
   * The input mode (e.g., numeric, text) for BAVV, BPOP or BOCC. It doesn't apply to BBOG.
   */
  @Prop() inputModeProp?: string;

  /**
   * The maxlength attribute defining max number of characters.
   */
  @Prop() maxLength?: number;

  /**
   * The minlength attribute defining min number of characters.
   */
  @Prop() minLength?: number;

  /**
   * The text shown as helper below the input for BAVV, BPOP or BBOG. It doesn't apply to BOCC.
   */
  @Prop() helper?: string;

  /**
   * The icon name for the input of BAVV.
   */
  @Prop() bavvIconName: string = '';

  /**
   * The icon position for the input of BAVV.
   */
  @Prop() bavvIconPosition: 'left' | 'right' | '' = '';

  /**
   * Optional button text to display on the right side of the input for BAVV.
   */
  @Prop() bavvButtonText: string = '';

  /**
   * Emitted when the user clicks on BAVV button.
   */
  @Event() bavvButtonClick: EventEmitter<void>;

  /**
   * Emitted when the BAVV input value changes.
   */
  @Event() bavvValueChange: EventEmitter<void>;

  /**
   * Emitted when the BAVV input changes.
   */
  @Event() bavvInputChange: EventEmitter<void>;

  /**
   * Emitted when the BAVV input gets focus on.
   */
  @Event() bavvInputFocus: EventEmitter<void>;

  /**
   * Emitted when the BAVV input loses focus on.
   */
  @Event() bavvInputBlur: EventEmitter<void>;

  /**
   * The attributes of the input field of BOCC
   */
  @Prop() boccAttributes?: BoccInput | string;

  /**
   * The field status of the input field of BOCC
   */
  @Prop() boccFieldStatus: FIELD_STATUS | string;

  /**
   * The maximum number of decimals allowed of BOCC
   */
  @Prop() boccMaximumDecimalsAllowed = 0;

  /**
   * The prefix text of the input field of BOCC
   */
  @Prop() boccPrefixText: string = '';

  /**
   * Step size (number/date) of BPOP.
   */
  @Prop() bpopStepSize?: string | number;

  /**
   * HTML `size` attribute of BPOP.
   */
  @Prop() bpopSize?: number;

  /**
   * HTML `spellcheck` attribute of BPOP.
   */
  @Prop() bpopSpellcheckProp: boolean = false;

  /**
   * `tabindex` to apply of BPOP.
   */
  @Prop() bpopTabIndexProp?: number;

  /**
   * HTML `title` attribute of BPOP.
   */
  @Prop() bpopTitleProp: string = '';

  /**
   * Aria label for the input of BPOP.
   */
  @Prop() bpopAriaLabelProp: string = '';

  /**
   * IDs to describe via `aria-describedby` of BPOP.
   */
  @Prop() bpopAriaDescribedBy: string = '';

  /**
   * Input `autocapitalize` attribute of BPOP.
   */
  @Prop() bpopAutocapitalizeProp: string = '';

  /**
   * Name of the icon to render of BPOP.
   */
  @Prop() bpopIconName: string = '';

  /**
   * Icon position (`left`/`right`) of BPOP.
   */
  @Prop() bpopIconPosition: 'left' | 'right' | '' = '';

  /**
   * Text of the embedded button (right side) of BPOP.
   */
  @Prop() bpopButtonText: string = '';

  /**
   * Name of the icon to render of BBOG.
   */
  @Prop() bbogIcon: string = '';

  /**
   * Enables/Disables the control of BBOG.
   */
  @Prop() bbogStatus: string = 'ENABLED';

  /**
   * Enables/Disables the hide password mode.
   */
  @Prop() bbogPasswordMode: boolean = false;

  /**
   * Show/Hide tooltip of BBOG.
   */
  @Prop() bbogTooltip: boolean = false;

  /**
   * The tooltip message of BBOG
   */
  @Prop() bbogTooltipMessage?: string;

  /**
   * The tooltip position of BBOG
   */
  @Prop() bbogTooltipPosition: string = 'right';

  /**
   * The tooltip title of BBOG
   */
  @Prop() bbogTooltipTitle?: string;

  /**
   * View mode of BBOG.
   */
  @Prop() bbogViewMode: boolean = false;

  /**
   * The interactive tooltip message of BBOG
   */
  @Prop() bbogInteractiveTooltipMessage?: string;

  /**
   * Autoselect of BBOG.
   */
  @Prop() bbogAutoSelect: boolean = false;

  /**
   * Email validation on blur of BBOG.
   */
  @Prop() bbogEmailValidationOnBlur: boolean = false;

  /**
   * Name of the left icon to render of BBOG.
   */
  @Prop() bbogLeftIcon?: string;

  /**
   * The decimal quantity of BBOG.
   */
  @Prop() bbogDecimalQuantity?: number;

  /**
   * Emitted when the user input of BBOG changes.
   */
  @Event() bbogAtInputChanged: EventEmitter<void>;

  /**
   * Emitted when the user enters the enter key on BBOG input.
   */
  @Event() bbogAtInputEnterKey: EventEmitter<void>;

  /**
   * Emitted when it looses focus on BBOG input.
   */
  @Event() bbogAtInputOnBlur: EventEmitter<void>;

  /**
   * Emitted when it gains focus on BBOG input.
   */
  @Event() bbogAtInputOnFocus: EventEmitter<void>;

  /**
   * Emitted when the user enters any key down on BBOG input.
   */
  @Event() bbogAtInputOnKeyDown: EventEmitter<void>;

  /**
   * Emitted when the user input of BBOG is updated.
   */
  @Event() bbogAtInputUpdated: EventEmitter<void>;

  /**
   * Emitted when the user clicks on the input icon of BBOG.
   */
  @Event() bbogOnInputIconClick: EventEmitter<void>;

  private getParsedBoccAttributes(): Record<string, any> {
    try {
      if (this.boccAttributes === undefined || this.boccAttributes === null) {
        return {};
      }

      if (typeof this.boccAttributes === 'object') {
        return this.boccAttributes;
      }

      if (typeof this.boccAttributes === 'string') {
        return JSON.parse(this.boccAttributes);
      }

      return {};
    } catch (e) {
      return {};
    }
  }

  private handleBavvButtonClick = () => {
    this.bavvButtonClick.emit();
  };

  private handleBavvValueChange = () => {
    this.bavvValueChange.emit();
  };

  private handleBavvInputChange = () => {
    this.bavvInputChange.emit();
  };

  private handleBavvInputFocus = () => {
    this.bavvInputFocus.emit();
  };

  private handleBavvInputBlur = () => {
    this.bavvInputBlur.emit();
  };

  private handleBbogAtInputChanged = (event: any) => {
    this.bbogAtInputChanged.emit(event);
  };

  private handleBbogAtInputEnterKey = (event: any) => {
    this.bbogAtInputEnterKey.emit(event);
  };

  private handleBbogAtInputOnBlur = (event: any) => {
    this.bbogAtInputOnBlur.emit(event);
  };

  private handleBbogAtInputOnFocus = (event: any) => {
    this.bbogAtInputOnFocus.emit(event);
  };

  private handleBbogAtInputOnKeyDown = (event: any) => {
    this.bbogAtInputOnKeyDown.emit(event);
  };

  private handleBbogAtInputUpdated = (event: any) => {
    this.bbogAtInputUpdated.emit(event);
  };

  private handleBbogOnInputIconClick = (event: any) => {
    this.bbogOnInputIconClick.emit(event);
  };

  private buttonMap: Record<DesignioInput['entity'], () => any> = {
    bavv: () => (
      <bavv-designio-input
        type={this.type}
        labelProp={this.label}
        value={this.value}
        placeholder={this.placeholder}
        idProp={this.idProp}
        name={this.name}
        disabled={this.disabled}
        readonly={this.readonly}
        required={this.required}
        min={this.min}
        max={this.max}
        autocomplete={this.autocomplete}
        pattern={this.pattern}
        inputModeProp={this.inputModeProp}
        maxLength={this.maxLength}
        minLength={this.minLength}
        helper={this.helper}
        iconName={this.bavvIconName}
        iconPosition={this.bavvIconPosition}
        buttonText={this.bavvButtonText}
        onButtonClick={this.handleBavvButtonClick}
        onValueChange={this.handleBavvValueChange}
        onInputChange={this.handleBavvInputChange}
        onInputFocus={this.handleBavvInputFocus}
        onInputBlur={this.handleBavvInputBlur}></bavv-designio-input>
    ),
    bocc: () => (
      <bdo-input-field
        attributesinput={{
          type: this.type as any,
          value: this.value,
          placeholder: this.placeholder,
          id: this.idProp,
          name: this.name,
          readonly: String(this.readonly),
          required: String(this.required),
          min: typeof this.min === 'string' ? parseFloat(this.min) : this.min,
          max: typeof this.max === 'string' ? parseFloat(this.max) : this.max,
          pattern: this.pattern,
          inputmode: this.inputModeProp as any,
          maxlength: this.maxLength,
          minlength: this.minLength,
          disabled: this.disabled,
          ...this.getParsedBoccAttributes()
        }}
        label={this.label}
        fieldStatus={this.boccFieldStatus}
        maximumDecimalsAllowed={this.boccMaximumDecimalsAllowed}
        prefixText={this.boccPrefixText}></bdo-input-field>
    ),
    bpop: () => (
      <bpop-designio-input
        type={this.type}
        labelProp={this.label}
        value={this.value}
        placeholder={this.placeholder}
        idProp={this.idProp}
        name={this.name}
        isDisabled={this.disabled}
        isReadonly={this.readonly}
        isRequired={this.required}
        minChars={this.minLength}
        maxChars={this.maxLength}
        minValue={this.min}
        maxValue={this.max}
        stepSize={this.bpopStepSize}
        pattern={this.pattern}
        inputModeProp={this.inputModeProp}
        size={this.bpopSize}
        spellcheckProp={this.bpopSpellcheckProp}
        tabIndexProp={this.bpopTabIndexProp}
        titleProp={this.bpopTitleProp}
        ariaLabelProp={this.bpopAriaLabelProp}
        ariaDescribedBy={this.bpopAriaDescribedBy}
        autocapitalizeProp={this.bpopAutocapitalizeProp}
        helper={this.helper}
        iconName={this.bpopIconName}
        iconPosition={this.bpopIconPosition}
        buttonText={this.bpopButtonText}
        autocomplete={
          this.autocomplete as AutocompleteToken
        }></bpop-designio-input>
    ),
    bbog: () => (
      <sp-at-input
        type={this.type.toUpperCase()}
        label={this.label}
        value={this.value}
        icon={this.bbogIcon}
        idEl={this.idProp}
        maxlength={this.maxLength}
        message={this.helper}
        minlength={
          typeof this.minLength === 'number'
            ? this.minLength.toString()
            : this.minLength
        }
        name={this.name}
        placeholder={this.placeholder}
        required={this.required}
        status={this.bbogStatus}
        passwordMode={this.bbogPasswordMode}
        autoComplete={this.autocomplete !== '' ? false : true}
        tooltip={this.bbogTooltip}
        tooltipMessage={this.bbogTooltipMessage}
        tooltipPosition={this.bbogTooltipPosition}
        tooltipTitle={this.bbogTooltipTitle}
        viewMode={this.bbogViewMode}
        regex={this.pattern}
        interactiveTooltip={this.bbogInteractiveTooltipMessage}
        readOnly={this.readonly}
        minValue={
          typeof this.min === 'string' ? parseFloat(this.min) : this.min
        }
        maxValue={
          typeof this.max === 'string' ? parseFloat(this.max) : this.max
        }
        autoSelect={this.bbogAutoSelect}
        emailValidationOnBlur={this.bbogEmailValidationOnBlur}
        leftIcon={this.bbogLeftIcon}
        onAtInputChanged={this.handleBbogAtInputChanged}
        onAtInputEnterKey={this.handleBbogAtInputEnterKey}
        onAtInputOnBlur={this.handleBbogAtInputOnBlur}
        onAtInputOnFocus={this.handleBbogAtInputOnFocus}
        onAtInputOnKeyDown={this.handleBbogAtInputOnKeyDown}
        onAtInputUpdated={this.handleBbogAtInputUpdated}
        onIconClickInput={this.handleBbogOnInputIconClick}></sp-at-input>
    )
  };

  render() {
    const renderFn = this.buttonMap[this.entity];
    return <div class="designio-input-wrapper">{renderFn()}</div>;
  }
}
