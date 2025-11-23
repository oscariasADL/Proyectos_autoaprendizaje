/* eslint-disable @stencil-community/strict-boolean-conditions */

import { Component, Prop, h, Element } from '@stencil/core';
import { FooterDesignioVariant } from './designio-footer.enum';

@Component({
  tag: 'designio-footer',
  styleUrl: 'designio-footer.scss',
  shadow: true
})
export class DesignioFooter {
  /** Bank footer */
  @Prop() type: 'bocc' | 'bpop' | 'bavv' | 'bbog' = 'bocc';

  /** Props commons */
  @Prop() variant: FooterDesignioVariant = FooterDesignioVariant.DEFAULT;

  /** showAdditionalText */
  @Prop() showAdditionalText = false;

  /** additionalText */
  @Prop() additionalText: string = 'Texto adicional';

  /** showFogafinLogo */
  @Prop() showFogafinLogo = false;

  /** Props BOCC */
  @Prop() elementId: string = 'bdo-footer-company';

  @Element() hostElement!: HTMLDesignioFooterElement;

  private footerMap: Record<DesignioFooter['type'], () => any> = {
    bavv: () => (
      <bavv-designio-footer
        variant={this.variant}
        showAdditionalText={this.showAdditionalText}
        additionalText={this.additionalText}
        showFogafinLogo={this.showFogafinLogo}
      />
    ),

    bocc: () => {
      const hasLeft = !!this.hostElement.querySelector('[slot="icon-left"]');
      const hasRight = !!this.hostElement.querySelector('[slot="icon-right"]');

      return (
        <bdo-footer-company elementId={this.elementId}>
          {hasLeft && <slot name="icon-left" slot="icon-left"></slot>}
          {hasRight && <slot name="icon-right" slot="icon-right"></slot>}
        </bdo-footer-company>
      );
    },

    bpop: () => <div></div>,
    bbog: () => <div></div>
  };

  render() {
    const renderFn = this.footerMap[this.type];
    return <div>{renderFn()}</div>;
  }
}
