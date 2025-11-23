import {
  Component,
  Prop,
  Event,
  EventEmitter,
  State,
  Watch,
  h
} from '@stencil/core';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-at-radio-button': any;
    }
  }
}

export interface RadioButtonAttributes {
  id?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  class?: string;
}

export interface RadioButtonChangeDetail {
  checked: boolean;
  value?: string;
  id?: string;
  name?: string;
  type: string;
}

@Component({
  tag: 'designio-radio-button',
  shadow: true
})
export class DesignioRadioButton {
  static groupRegistry: Map<string, DesignioRadioButton[]> = new Map();

  /**
   * The unique id for the radio button.
   */
  @Prop() radioId: string;
  /**
   * The group name for the radio button.
   */
  @Prop() name: string;
  /**
   * The label for the radio button.
   */
  @Prop() label?: string;
  /**
   * Show the label next to the radio button.
   * @default true
   */
  @Prop() showLabel: boolean = true;
  /**
   * Whether the radio button is checked.
   * @default false
   */
  @Prop({ reflect: true }) checked: boolean = false;
  /**
   * Whether the radio button is disabled.
   * @default false
   */
  @Prop({ reflect: true }) disabled: boolean = false;
  /**
   * The value of the radio button.
   */
  @Prop() value?: string;
  /**
   * The visual state of the radio button.
   * @default 'default'
   */
  @Prop() state?:
    | 'default'
    | 'hover'
    | 'error'
    | 'info'
    | 'disabled'
    | 'checked' = 'default';
  /**
   * The type of radio button (design system).
   * @default 'bpop'
   */
  @Prop() type: 'bpop' | 'bavv' | 'bbog' | 'bocc' = 'bpop';
  /**
   * The size of the radio button.
   * @default 'default'
   */
  @Prop() size?: 'default' | 'large' | 'medium' | 'small' = 'default';
  /**
   * Whether to wrap the radio in a container.
   * @default false
   */
  @Prop() container?: boolean = false;
  /**
   * Whether to invert the label position.
   * @default false
   */
  @Prop() invertLabel?: boolean = false;
  /**
   * Allow unselecting the radio button.
   * @default false
   */
  @Prop() allowUnselect?: boolean = false;

  /**
   * Custom attributes for the radio button.
   */
  @Prop() customAttributes?: RadioButtonAttributes | string;

  /**
   * Emitted when the radio button changes.
   */
  @Event() radioChange: EventEmitter<RadioButtonChangeDetail>;

  @State() internalChecked: boolean = false;
  @State() groupVersion: number = 0;

  private bumpGroup() {
    if (this.groupVersion === undefined || this.groupVersion === null) {
      this.groupVersion = 0;
    }
    this.groupVersion++;
  }

  componentWillLoad() {
    this.internalChecked = !!this.checked;
    this.registerInGroup();
  }

  disconnectedCallback() {
    this.unregisterFromGroup();
  }

  @Watch('checked')
  syncChecked(newValue: boolean) {
    this.internalChecked = !!newValue;
  }

  private registerInGroup() {
    if (!this.name || this.name === '') return;
    const list = DesignioRadioButton.groupRegistry.get(this.name) || [];
    if (!list.includes(this)) {
      list.push(this);
      DesignioRadioButton.groupRegistry.set(this.name, list);
      const first = list[0];
      if (first) first.bumpGroup();
    }
  }

  private unregisterFromGroup() {
    if (!this.name || this.name === '') return;
    const list = DesignioRadioButton.groupRegistry.get(this.name);
    if (!list) return;
    const filtered = list.filter((r) => r !== this);
    DesignioRadioButton.groupRegistry.set(this.name, filtered);
    const first = filtered[0];
    if (first) first.bumpGroup();
  }

  private setGroupSelection(targetValue: string | null) {
    if (!this.name || this.name === '') {
      this.internalChecked = targetValue === this.value;
      if (this.type === 'bbog' && this.internalChecked) this.bumpGroup();
      return;
    }
    const list = DesignioRadioButton.groupRegistry.get(this.name) || [];
    list.forEach((r) => {
      r.internalChecked = targetValue !== null && r.value === targetValue;
    });
    const first = list[0];
    if (first?.type === 'bbog') first.bumpGroup();
  }

  private emitChange(checked: boolean) {
    this.radioChange.emit({
      checked,
      value: this.value,
      id: this.radioId,
      name: this.name,
      type: this.type
    });
  }

  private handleSelection = (_event?: CustomEvent<any>) => {
    if (this.disabled) return;
    if (this.allowUnselect && this.internalChecked) {
      this.setGroupSelection(null);
      this.emitChange(false);
      return;
    }
    if (this.internalChecked && !this.allowUnselect) return;
    this.setGroupSelection(this.value ?? '');
    this.emitChange(true);
  };

  private handleBbogGroupChange = (ev: CustomEvent<{ value: string }>) => {
    const val = ev.detail?.value;
    this.setGroupSelection(val ?? null);
  };

  private parseCustomAttributes() {
    const base = {
      id: this.radioId,
      value: this.value,
      disabled: !!this.disabled
    };
    let extra = this.customAttributes;
    if (!extra) return base;
    if (typeof extra === 'string') {
      try {
        extra = JSON.parse(extra);
      } catch {
        extra = {};
      }
    }
    return { ...base, ...(extra as any) };
  }

  private renderBPOP() {
    return (
      <bpop-designio-radio-button
        idRadio={this.radioId}
        radioName={this.name}
        label={this.label}
        hasLabel={this.showLabel}
        isChecked={this.internalChecked}
        isDisabled={this.disabled}
        onRadioChange={this.handleSelection}></bpop-designio-radio-button>
    );
  }

  private renderBAVV() {
    return (
      <bavv-designio-radio-button
        idRadio={this.radioId}
        name={this.name}
        label={this.label}
        withoutLabel={!this.showLabel}
        checked={this.internalChecked}
        disabled={this.disabled}
        value={this.value}
        state={this.state as any}
        onRadioChange={this.handleSelection}
      />
    );
  }

  private renderBOCC() {
    const attributes = this.parseCustomAttributes();
    attributes.checked = this.internalChecked;
    attributes.disabled = this.disabled;
    attributes.name = this.name;
    attributes.id = this.radioId;
    attributes.value = this.value;
    return (
      <bdo-radiobutton
        attributesinputradio={attributes}
        label={this.label || ''}
        invert={this.invertLabel}
        allowUnselect={this.allowUnselect}
        onChanged={this.handleSelection}
      />
    );
  }

  private renderBBOG() {
    const isAggregator =
      !this.name ||
      DesignioRadioButton.groupRegistry.get(this.name)?.[0] === this;
    return isAggregator ? (
      <sp-at-radio-button
        data-group-version={this.groupVersion}
        data-value={this.value}
        data-label={this.label}
        data-checked={this.internalChecked ? 'true' : 'false'}
        data-id={this.radioId}
        data-name={this.name}
        data-disabled={this.disabled ? 'true' : 'false'}
        onChange={this.handleBbogGroupChange}></sp-at-radio-button>
    ) : null;
  }

  private radioMapper: Record<string, () => any> = {
    bpop: () => this.renderBPOP(),
    bavv: () => this.renderBAVV(),
    bocc: () => this.renderBOCC(),
    bbog: () => this.renderBBOG()
  };

  render() {
    const renderFn = this.radioMapper[this.type] || (() => this.renderBPOP());
    return <div>{renderFn()}</div>;
  }
}
