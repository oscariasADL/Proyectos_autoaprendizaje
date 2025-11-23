import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element
} from '@stencil/core';
import { InteractiveState } from '@avaldigitallabs/adl-commons-design-system-frontend-bpop-designio/dist/types/commons/models/bpop-designio-interactive-state.interfaces';
import { BadgeSize as BadgeSizePop } from '@avaldigitallabs/adl-commons-design-system-frontend-bpop-designio/dist/types/commons/models/molecules/bpop-designio-badge.interfaces';

@Component({
  tag: 'designio-badge',
  styleUrl: 'designio-badge.scss',
  shadow: true
})
export class DesignioBadge {
  /** Texto del badge (si no se usa el slot) */
  @Prop() label?: string;

  /** Tipo/entidad del badge que determina el adapter a renderizar */
  @Prop() type: 'bocc' | 'bpop' | 'bavv' | 'bbog' = 'bbog';

  /** Identificador único para el badge/subcomponente */
  @Prop() idBadge?: string;

  /** Variante visual (mapeada por banco) */
  @Prop() variant?: string;

  /** Tamaño del badge (valores dependen del banco) */
  @Prop() size?: string;

  /** Ícono de prefijo (soportado en bpop y bocc) */
  @Prop() prefixIcon?: string;

  /** Ícono de sufijo (soportado en bpop) */
  @Prop() suffixIcon?: string;

  /** Clases CSS adicionales (BOCC) */
  @Prop() classNames?: string;

  /** Visibilidad del badge (BOCC). Si es false, no se muestra. */
  @Prop() isVisible?: boolean;

  /** Forma cuadrada (BOCC). Para BAVV use shape. */
  @Prop() isSquare?: boolean;

  /** Forma del borde (BAVV) */
  @Prop() shape?: string;

  /** Muestra botón de cierre (BBOG) */
  @Prop() removeTag?: boolean;

  /** Modo sólido (BBOG) */
  @Prop() isSolid?: boolean;

  /** Evento emitido al interactuar con el badge */
  @Event() badgeClicked: EventEmitter<{
    type: 'bocc' | 'bpop' | 'bavv' | 'bbog';
    id?: string;
    label?: string;
  }>;
  // eslint-disable-next-line @stencil-community/element-type
  @Element() hostElement!: HTMLElement;

  private onInternalClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.badgeClicked.emit({
      type: this.type,
      id: this.idBadge || this.hostElement?.id,
      label: this.label
    });
  };

  private handleBbogClose = (e: CustomEvent<any>) => {
    e.stopPropagation();
    this.badgeClicked.emit({
      type: 'bbog',
      id: this.idBadge,
      label: this.label
    });
  };

  private renderContent() {
    if (this.label !== undefined && this.label !== null) {
      return this.label;
    }
    return <slot />;
  }

  render() {
    if (this.type === 'bpop') {
      return (
        <bpop-designio-badge
          idBadge={this.idBadge || 'bpop-badge'}
          visualState={this.variant as InteractiveState}
          badgeSize={this.size as BadgeSizePop}
          prefixIcon={this.prefixIcon}
          suffixIcon={this.suffixIcon}
          onClick={this.onInternalClick}>
          {this.renderContent()}
        </bpop-designio-badge>
      );
    }

    if (this.type === 'bocc') {
      if (!this.isVisible) return null;
      return (
        <bdo-badge
          elementId={this.idBadge || 'bocc-badge'}
          classNames={this.classNames}
          icon={this.prefixIcon}
          visible={this.isVisible}
          message={this.label}
          badgeType={this.variant}
          size={this.size}
          square={this.isSquare}
          onClick={this.onInternalClick}
        />
      );
    }

    if (this.type === 'bavv') {
      return (
        <bavv-designio-badge
          variant={this.variant as any}
          shape={this.shape as any}
          onClick={this.onInternalClick}>
          {this.renderContent()}
        </bavv-designio-badge>
      );
    }

    if (this.type === 'bbog') {
      return (
        <sp-at-tag
          key={`${this.variant}-${this.isSolid ? 'solid' : 'outline'}`}
          idEl={this.idBadge || 'bbog-badge'}
          isSolid={this.isSolid}
          removeTag={this.removeTag}
          text={this.renderContent() as string}
          type={this.variant}
          onAtCloseTag={this.handleBbogClose}
        />
      );
    }
  }
}
