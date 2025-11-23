/* eslint-disable @stencil-community/own-props-must-be-private */
import {
  Component,
  Prop,
  Event,
  EventEmitter,
  h,
  Element
} from '@stencil/core';
import { SIZE_BUTTON, WIDTH_MODE } from '../../commons/button-bavv.interface';
import { BdoButtonType, Button } from '../../commons/button-bocc.interface';
import {
  SIZE_BUTTON as SIZE_BUTTON_BPOP,
  VARIANT_BUTTON,
  WIDTH_MODE as WIDTH_MODE_BPOP
} from '../../commons/button-bpop.interface';

@Component({
  tag: 'designio-button',
  styleUrl: 'designio-button.scss',
  shadow: true
})
export class DesignioButton {
  /**
   * Name or description of button
   */
  @Prop() label: string = '';

  /**
   * Type or entity form button
   */
  @Prop() type: 'bocc' | 'bpop' | 'bavv' | 'bbog' = 'bbog';

  /**
   * State of button is Disabled true or false
   */
  @Prop() isDisabled: boolean = false;

  /**
   * State of button is Loading true or false
   */
  @Prop() isLoading: boolean = false;

  // PROPIEDADES PARA BPOP - ACTUALIZADAS CON TIPOS CORRECTOS
  /**
   * Prop variant for bpop-design-button
   */
  @Prop() variantBpop: VARIANT_BUTTON = VARIANT_BUTTON.PRIMARY;

  /**
   * Size for BPOP button
   */
  @Prop() sizeBpop: SIZE_BUTTON_BPOP = SIZE_BUTTON_BPOP.REGULAR;

  /**
   * Width mode for BPOP button
   */
  @Prop() widthModeBpop: WIDTH_MODE_BPOP = WIDTH_MODE_BPOP.DEFAULT;

  /**
   * Prop variant for bavv-design-button
   */
  @Prop() variantBavv: 'primary' | 'secondary' | 'tertiary' | 'borderless' =
    'primary';

  // NUEVAS PROPIEDADES PARA BOCC
  /**
   * Type/variant for BOCC button - usando BdoButtonType correcto
   */
  @Prop() variantBocc: BdoButtonType = 'primary';

  /**
   * Size for BOCC button (L, M, S)
   */
  @Prop() sizeBocc: 'L' | 'M' | 'S' = 'M';

  /**
   * Enable divider between text and suffix icon for BOCC
   */
  @Prop() dividedBocc: boolean = false;

  /**
   * Prop for load icon before name in button
   */
  @Prop() prefixIcon?: string;

  /**
   * Prop for load icon after name in button
   */
  @Prop() suffixIcon?: string;

  /**
   * Id of button
   */
  @Prop() idButton?: string;

  // NUEVAS PROPIEDADES PARA BAVV
  /**
   * The type of the button (for BAVV). BUTTON, SUBMIT, RESET.
   */
  @Prop() buttonType: 'button' | 'submit' | 'reset' = 'submit';

  /**
   * The size of the button (for BAVV). SMALL, REGULAR.
   */
  @Prop() sizeBavv: SIZE_BUTTON = SIZE_BUTTON.REGULAR;

  /**
   * The width mode of the button (for BAVV). DEFAULT, AUTO, FULL.
   */
  @Prop() widthModeBavv: WIDTH_MODE = WIDTH_MODE.DEFAULT;

  /**
   * The html index of the button (for BAVV).
   */
  @Prop() htmlIndex: number = 0;

  /**
   * The name of the button (for BAVV).
   */
  @Prop() name?: string;

  /**
   * Custom width for the button (for BAVV).
   */
  @Prop() customWidth?: string;

  /**
   * Custom height for the button (for BAVV).
   */
  @Prop() customHeight?: string;

  /**
   * Event of Button
   */
  @Event() buttonClicked: EventEmitter<{
    type: string;
    id?: string;
    label?: string;
    value?: any;
  }>;

  @Element() hostElement!: HTMLDesignioButtonElement;

  private onInternalClick = (
    event: CustomEvent<{ id: string; label?: string; value?: any }> | MouseEvent
  ) => {
    event.stopPropagation();
    const detail = (event as any)?.detail;
    const id = detail?.id || this.idButton;
    const label = detail?.label || this.label;
    const value = detail?.value;

    this.buttonClicked.emit({
      type: this.type,
      id,
      label,
      value
    });
    console.log(
      `Botón del adapter tipo ${this.type} clickeado, id: ${id}, label: ${label}`
    );
  };

  private buttonMap: Record<DesignioButton['type'], () => any> = {
    bocc: () => {
      const attributesButton: Button = {
        id: this.idButton || 'bocc-btn',
        name: this.name,
        tabindex: this.htmlIndex,
        type: this.buttonType,
        disabled: this.isDisabled,
        class: 'designio-adapter-button'
      };

      const BdoButtonComponent = 'bdo-button' as any;

      return (
        <BdoButtonComponent
          textButton={this.label}
          typeButton={this.variantBocc}
          disabled={this.isDisabled}
          prefixIcon={this.prefixIcon}
          suffixIcon={this.suffixIcon}
          size={this.sizeBocc}
          divided={this.dividedBocc}
          attributesbutton={attributesButton}
          onClickButton={this.onInternalClick}
          onCustomClick={this.onInternalClick}
        />
      );
    },
    bavv: () => (
      <bavv-designio-button
        idButton={this.idButton || this.hostElement?.id || 'bavv-btn'}
        type={this.buttonType}
        disabled={this.isDisabled}
        htmlIndex={this.htmlIndex}
        name={this.name}
        prefixIcon={this.prefixIcon}
        suffixIcon={this.suffixIcon}
        size={this.sizeBavv}
        variant={this.variantBavv}
        widthMode={this.widthModeBavv}
        customWidth={this.customWidth}
        customHeight={this.customHeight}
        onButtonClick={this.onInternalClick}>
        {this.label}
      </bavv-designio-button>
    ),
    bpop: () => (
      <bpop-designio-button
        idButton={this.idButton || 'bpop-btn'}
        type={this.buttonType}
        disabled={this.isDisabled}
        loading={this.isLoading}
        htmlIndex={this.htmlIndex}
        name={this.name}
        prefixIcon={this.prefixIcon}
        suffixIcon={this.suffixIcon}
        size={this.sizeBpop}
        variant={this.variantBpop}
        widthMode={this.widthModeBpop}
        onButtonClick={this.onInternalClick}>
        {this.label}
      </bpop-designio-button>
    ),
    bbog: () => (
      <button
        id={this.idButton || 'bbog-btn'}
        type={this.buttonType}
        disabled={this.isDisabled}
        name={this.name}
        tabIndex={this.htmlIndex}
        class="sp-at-btn sp-at-btn--primary sp-at-btn--lg"
        onClick={this.onInternalClick}>
        {this.label}
      </button>
    )
  };

  render() {
    const renderFn = this.buttonMap[this.type];
    return <div>{renderFn()}</div>;
  }
}
