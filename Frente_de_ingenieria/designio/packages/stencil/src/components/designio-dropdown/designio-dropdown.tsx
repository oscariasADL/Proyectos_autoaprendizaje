/* eslint-disable @stencil-community/strict-boolean-conditions */
import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element
} from '@stencil/core';
import {
  SizeDropDown,
  StateDropDown
} from '@avaldigitallabs/adl-commons-design-system-frontend-bpop-designio/dist/types/commons/models/molecules/bpop-designio-dropdown.interfaces';
import { Option } from '@avaldigitallabs/adl-commons-design-system-frontend-bocc-designio/dist/types/commons/models/select.interfaces';

@Component({
  tag: 'designio-dropdown',
  styleUrl: 'designio-dropdown.scss',
  shadow: true
})
export class DesignioDropdown {
  /** Label dropdown */
  @Prop() type: 'bocc' | 'bpop' | 'bavv' | 'bbog' = 'bbog';

  /** Label dropdown */
  @Prop() label?: string;

  /** Placeholder */
  @Prop() placeholder?: string;

  /** Helper Text */
  @Prop() helperText?: string;

  /** State dropdown (error, warning, default, selected...) */
  @Prop() state?: StateDropDown;

  /** Size dropdown */
  @Prop() size?: SizeDropDown;

  /** Disabled dropdown*/
  @Prop() isDisabled?: boolean = false;

  /** Options List */
  @Prop() options: any[] = [];

  /** Select Value */
  @Prop() value?: string | number;

  /** Popup Mode mobile*/
  @Prop() isPopUp?: boolean = false;

  /** Required*/
  @Prop() isRequired?: boolean = false;

  /** Text Help Bog*/
  @Prop() isHelp?: boolean = false;

  /** Tooltip enable (Bogotá only) */
  @Prop() tooltip?: boolean = false;

  /** Tooltip header text */
  @Prop() tooltipHeader?: string;

  /** Tooltip body text */
  @Prop() tooltipMessage?: string;

  /** Event emit to select */
  @Event({ eventName: 'designioSelectionChange' })
  selectionChange: EventEmitter<any>;

  /** HTMLDesignioDropdownElement  */
  @Element() hostElement!: HTMLDesignioDropdownElement;

  componentDidLoad() {
    const bpopEl = this.hostElement.shadowRoot?.querySelector(
      'bpop-designio-dropdown'
    );

    if (bpopEl) {
      bpopEl.addEventListener('selectionChange', (e: any) => {
        this.onSelect(e.detail);
      });
    }

    const bavvEl = this.hostElement.shadowRoot?.querySelector(
      'bavv-designio-dropdown'
    );

    if (bavvEl) {
      bavvEl.addEventListener('selectionChange', (e: any) => {
        this.onSelect(e.detail);
      });
    }

    this.applyBbogValue();
  }

  componentDidRender() {
    this.applyBbogValue();
  }

  private _bbogRef?: HTMLElement & { setValue?: (val: string) => void };

  private onSelect(
    option:
      | { value: string | number; label?: string; name?: string; text?: string }
      | Option
  ) {
    this.selectionChange.emit(option);
  }

  private handleBpopSelect = (
    e: CustomEvent<{ value: string | number; name: string; label: string }>
  ) => this.onSelect(e.detail);

  private handleBoccSelect = (e: CustomEvent<Option>) =>
    this.onSelect(e.detail);

  private handleBavvSelect = (e: CustomEvent<string | number>) => {
    const value = e.detail;
    const match = this.normalizeOptions().find(
      (o) => String(o.value) === String(value)
    );
    const enriched = { value, label: match?.label ?? '' };
    this.onSelect(enriched);
  };

  private handleBbogSelect = (
    e: CustomEvent<{ value: string; text: string }>
  ) => this.onSelect(e.detail);

  private mapFieldStatus(): 'error' | 'warning' | 'null' | 'info' | 'success' {
    const map: Record<
      StateDropDown,
      'error' | 'warning' | 'null' | 'info' | 'success'
    > = {
      default: 'null',
      selected: 'success',
      error: 'error',
      warning: 'warning'
    };
    return map[this.state ?? 'default'];
  }

  private mapBbogStatus(): string {
    if (this.isDisabled) return 'DISABLED';

    if (this.isHelp) return 'HELP';

    const map: Record<StateDropDown, string> = {
      default: 'ENABLED',
      selected: 'ENABLED',
      error: 'ERROR',
      warning: 'HELP'
    };
    return map[this.state ?? 'default'];
  }

  private mapBbogOptions(rawOptions?: any[]) {
    const opts = rawOptions ?? this.normalizeOptions();
    return (
      opts?.map((o) => ({
        text: o.label ?? o.text,
        value: String(o.value)
      })) ?? []
    );
  }

  private normalizeOptions() {
    if (typeof this.options === 'string') {
      try {
        return JSON.parse(this.options);
      } catch {
        return [];
      }
    }
    return this.options;
  }

  private mapBoccOptions(): Option[] {
    const raw = this.normalizeOptions();
    return raw.map((o) => ({
      id: o.id ?? String(o.value),
      value: o.label ?? o.text ?? String(o.value)
    }));
  }

  private getBoccSelectedOption(opts: Option[]): Option | null {
    const v = this.value;
    if (v == null) return null;

    return opts.find((o) => String(o.id) === String(v)) ?? null;
  }

  private applyBbogValue() {
    if (this.type !== 'bbog') return;
    if (!this._bbogRef) return;
    if (this.value == null) return;

    try {
      this._bbogRef.setValue(String(this.value));
    } catch (e) {
      console.warn('BBog setValue failed', e);
    }
  }

  private dropdownMap: Record<DesignioDropdown['type'], () => any> = {
    bpop: () => (
      <bpop-designio-dropdown
        label={this.label}
        name={this.label || 'dropdown'}
        placeholder={this.placeholder}
        helperText={this.helperText}
        state={this.state}
        size={this.size}
        isDisabled={this.isDisabled}
        {...(this.isDisabled ? { 'is-disabled': true } : {})}
        options={this.normalizeOptions()}
        value={this.value}
        isPopUp={this.isPopUp}
        onSelectionChange={this.handleBpopSelect}
      />
    ),

    bocc: () => {
      const options = this.mapBoccOptions();
      const selected = this.getBoccSelectedOption(options);

      return (
        <bdo-dropdown
          label={this.label}
          options={options}
          value={selected}
          fieldStatus={{
            typeStatus: this.mapFieldStatus(),
            message: this.helperText ?? '',
            icon: ''
          }}
          attributesselect={{
            id: 'bdo-dropdown',
            placeholder: this.placeholder ?? '',
            disabled: !!this.isDisabled
          }}
          onChanged={this.handleBoccSelect}
        />
      );
    },

    bavv: () => (
      <bavv-designio-dropdown
        label={this.label}
        options={this.normalizeOptions()}
        value={typeof this.value === 'number' ? String(this.value) : this.value}
        isDisabled={this.isDisabled}
        isPopUp={this.isPopUp}
        isError={this.state === 'error'}
        errorMessage={this.helperText ?? ''}
        isRequired={this.isRequired}
        onSelectionChange={this.handleBavvSelect}
      />
    ),

    bbog: () => (
      <sp-at-dropdown
        ref={(el) => (this._bbogRef = el)}
        name="designio-bbog"
        label={this.label}
        placeholder={this.placeholder}
        status={this.mapBbogStatus()}
        message={this.helperText}
        options={JSON.stringify(this.mapBbogOptions())}
        no-action={this.isDisabled ? 'true' : undefined}
        {...(this.tooltip ? { tooltip: true } : {})}
        tooltip-header={this.tooltipHeader}
        tooltip-message={this.tooltipMessage}
        onElementSelectedAtom={this.handleBbogSelect}
      />
    )
  };

  render() {
    const renderer = this.dropdownMap[this.type];
    return <div>{renderer()}</div>;
  }
}
