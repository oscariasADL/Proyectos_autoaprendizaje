import {
  Component,
  EventEmitter,
  Event,
  Prop,
  h,
  Method,
  Element
} from '@stencil/core';
import { BdoButtonStandard } from '../../commons/button-bocc.interface';

@Component({
  tag: 'designio-modal',
  shadow: true
})
export class DesignioModal {
  @Element() hostElement!: HTMLDesignioModalElement;

  /**
   * Modal type to display.
   */
  @Prop() type: 'bocc' | 'bpop' | 'bavv' | 'bbog' = 'bbog';

  /**
   * Optional element id for the modal.
   */
  @Prop() elementId?: string;

  /**
   * Title of the modal.
   */
  @Prop() modalTitle?: string;

  /**
   * Subtitle of the modal.
   */
  @Prop() subtitle?: string;

  /**
   * Icon name for the modal.
   */
  @Prop() icon?: string;

  /**
   * Illustrated icon name for the modal.
   */
  @Prop() illustratedIcon?: string;

  /**
   * Show close button in the modal.
   */
  @Prop() showClose?: boolean = false;

  /**
   * Title alignment.
   */
  @Prop() alignTitle?: 'left' | 'center' | 'right' = 'center';

  /**
   * Custom CSS class for the modal.
   */
  @Prop() customClass?: string;

  /**
   * Show primary button in the modal.
   */
  @Prop() showPrimaryButton?: boolean = false;

  /**
   * Show secondary button in the modal.
   */
  @Prop() showSecondaryButton?: boolean = false;

  /**
   * Primary button configuration.
   */
  @Prop() primaryButtonConfig?: BdoButtonStandard;

  /**
   * Secondary button configuration.
   */
  @Prop() secondaryButtonConfig?: BdoButtonStandard;

  /**
   * Direction of the modal buttons.
   */
  @Prop() direction?: 'horizontal' | 'vertical' = 'vertical';

  /**
   * Size of the modal.
   */
  @Prop() size?: 'lg' | 'md' | 'sm' = 'md';

  /**
   * Hide close button in the modal.
   */
  @Prop() hideClose?: boolean = false;

  /**
   * Custom modal ID.
   */
  @Prop() modalId?: string;

  /** Event emitted when the modal is opened. */
  @Event() opened: EventEmitter<{ type: string; modalId: string }>;
  /** Event emitted when the modal is closed. */
  @Event() closed: EventEmitter<{ type: string; modalId: string }>;

  public modalRef?: any;

  private getModalId(): string {
    return (
      this.elementId ||
      this.hostElement?.id ||
      `modal-${Math.random().toString(36).substr(2, 9)}`
    );
  }

  private createDefaultButton(
    id: string,
    label: string,
    typeButton: 'raised' | 'outline' = 'raised'
  ): BdoButtonStandard {
    return {
      id,
      label,
      typeButton,
      prefixIcon: undefined,
      suffixIcon: undefined,
      onClick: undefined
    };
  }

  /** Opens the modal programmatically. */
  @Method()
  async openModal(): Promise<void> {
    if (this.modalRef != null) {
      if (this.type === 'bocc') {
        this.modalRef.elementId = this.getModalId();
        if (this.showPrimaryButton) {
          this.modalRef.buttonPrimary =
            this.primaryButtonConfig ||
            this.createDefaultButton('btn-primary', 'Confirmar', 'raised');
        }
        if (this.showSecondaryButton) {
          this.modalRef.buttonSecondary =
            this.secondaryButtonConfig ||
            this.createDefaultButton('btn-secondary', 'Cancelar', 'outline');
        }
        this.modalRef.isopen = true;
      } else if (this.type === 'bavv' || this.type === 'bpop') {
        await this.modalRef.open?.();
      } else if (this.type === 'bbog') {
        this.modalRef.sizeModal = this.size;
        this.modalRef.hideClose = this.hideClose;
        if (typeof this.modalId === 'string' && this.modalId.length > 0) {
          this.modalRef.idModal = this.modalId;
        }
        await this.modalRef.openModal?.();
      }
      this.opened.emit({
        type: this.type,
        modalId: this.getModalId()
      });
    }
  }

  /** Closes the modal programmatically. */
  @Method()
  async closeModal(): Promise<void> {
    if (this.modalRef != null) {
      if (this.type === 'bocc') {
        this.modalRef.isopen = false;
      } else if (this.type === 'bavv') {
        (this.modalRef as any).isOpen = false;
      } else if (this.type === 'bpop') {
        await this.modalRef.close?.();
      } else if (this.type === 'bbog') {
        await this.modalRef.closeModal?.();
      }
      this.closed.emit({
        type: this.type,
        modalId: this.getModalId()
      });
    }
  }

  private handlePrimaryAction = () => {
    this.closeModal();
  };

  private handleSecondaryAction = () => {
    this.closeModal();
  };

  componentDidLoad() {
    if (this.modalRef != null) {
      this.modalRef.addEventListener?.('action', this.handlePrimaryAction);
      this.modalRef.addEventListener?.(
        'actionSecondary',
        this.handleSecondaryAction
      );
    }
  }

  disconnectedCallback() {
    if (this.modalRef != null) {
      this.modalRef.removeEventListener?.('action', this.handlePrimaryAction);
      this.modalRef.removeEventListener?.(
        'actionSecondary',
        this.handleSecondaryAction
      );
    }
  }

  private modalMapper = {
    bocc: () => (
      <bdo-modal
        ref={(el) => (this.modalRef = el)}
        id={this.getModalId()}
        elementId={this.getModalId()}
        isopen={false}
        buttonCloseShow={this.showClose}
        showPrimary={!!this.showPrimaryButton}
        showSecondary={!!this.showSecondaryButton}
        buttonPrimary={this.primaryButtonConfig}
        buttonSecondary={this.secondaryButtonConfig}
        class={this.customClass}>
        {this.icon && <bdo-icon class="iconModal" icon={this.icon}></bdo-icon>}
        {this.modalTitle && <h3 class="title">{this.modalTitle}</h3>}
        {this.subtitle && <p class="text">{this.subtitle}</p>}
        <slot name="content"></slot>
      </bdo-modal>
    ),
    bavv: () => (
      <bavv-designio-modal
        ref={(el) => (this.modalRef = el)}
        id={this.getModalId()}
        titleModal={this.modalTitle}
        alignTitle={this.alignTitle as any}
        showCloseButton={this.showClose}
        illustratedIcon={this.illustratedIcon}
        textConfirmButton="Confirmar"
        textCancelButton="Cancelar"
        class={this.customClass}>
        {this.subtitle && <p>{this.subtitle}</p>}
        <slot name="content"></slot>
      </bavv-designio-modal>
    ),
    bpop: () => (
      <bpop-designio-modal
        ref={(el) => (this.modalRef = el)}
        id={this.getModalId()}
        titleModal={this.modalTitle}
        alignTitle={this.alignTitle as any}
        directionButton={this.direction as any}
        showCloseButton={this.showClose}
        icon={this.icon}
        textConfirmButton="Confirmar"
        textCancelButton="Cancelar"
        class={this.customClass}>
        {this.subtitle && <p>{this.subtitle}</p>}
        <slot name="content"></slot>
      </bpop-designio-modal>
    ),
    bbog: () => (
      <sp-ml-modal-normal
        ref={(el) => (this.modalRef = el)}
        id={this.getModalId()}
        size-modal={this.size}
        hideClose={this.hideClose}
        idModal={this.modalId}
        titlemodal={this.modalTitle}
        back-drop-close
        class={this.customClass}>
        {/* Para BBOG usamos slot body-modal en lugar de content */}
        <div slot="body-modal">
          {this.subtitle && <p>{this.subtitle}</p>}
          <slot name="content"></slot>
        </div>
      </sp-ml-modal-normal>
    )
  };

  private renderModal() {
    return this.modalMapper[this.type]?.() ?? null;
  }

  render() {
    return <div>{this.renderModal()}</div>;
  }
}
