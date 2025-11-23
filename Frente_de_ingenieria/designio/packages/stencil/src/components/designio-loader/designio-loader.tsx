/* eslint-disable @stencil-community/own-props-must-be-private */
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'designio-loader',
  styleUrl: 'designio-loader.scss',
  shadow: true
})
export class DesignioLoader {
  /**
   * Type or entity form buttom
   */
  @Prop() type: 'bocc' | 'bpop' | 'bavv' | 'bbog' = 'bbog';

  /**
   * Makes loader visible or hidden
   */
  @Prop({ mutable: false, reflect: true }) isopen?: boolean;

  /**
   * Main text for loader (BOCC, BAVV, BBOG, BPOP)
   */
  @Prop({ mutable: false, reflect: true }) mainText?: string;
  /**
   * Secondary text for loader, if available (BOCC, BAVV)
   */
  @Prop({ mutable: false, reflect: true }) secondaryText?: string;

  /**
   * Starts animation as soon as component is loaded (BBOG)
   */
  @Prop({ mutable: false, reflect: true }) autoPlay?: boolean;
  /**
   * External json file for animation (BBOG)
   */
  @Prop({ mutable: false, reflect: true }) fileAnimation?: string;
  /**
   * Id for loader element (BBOG)
   */
  @Prop({ mutable: false, reflect: true }) idEl?: string;
  /**
   * Plays animation in a loop (BBOG)
   */
  @Prop({ mutable: false, reflect: true }) loop?: boolean;
  /**
   * Loader type (BBOG)
   */
  @Prop({ mutable: false, reflect: true }) loaderType?: string;

  /**
   * Displays a message when loader is open (BOCC)
   */
  @Prop({ mutable: false, reflect: true }) displayMessage?: boolean;

  /**
   * Variant for BAVV loader
   */
  @Prop({ mutable: false, reflect: true }) isMainSpinner?: boolean;

  /**
   * Loader size (BPOP)
   */
  @Prop({ mutable: false, reflect: true }) size?:
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large';

  private loaderMap: Record<DesignioLoader['type'], () => any> = {
    bocc: () => (
      // Realizar ajustes en componente bdo-loading para mostrar el texto
      <bdo-loading isopen={this.isopen} displayMessage={this.displayMessage}>
        <h3 class="long-text">
          {this.mainText}
          <br />
          {this.secondaryText}
        </h3>
      </bdo-loading>
    ),
    bavv: () => (
      <bavv-designio-spinner
        isMainSpinner={this.isMainSpinner}
        isVisible={this.isopen}
        mainText={this.mainText}
        secondaryText={this.secondaryText}></bavv-designio-spinner>
    ),
    bpop: () => (
      <bpop-designio-loader
        isDisabled={!this.isopen}
        size={this.size}
        label={this.mainText}></bpop-designio-loader>
    ),
    bbog: () => (
      <sp-ml-loader
        auto-play={this.autoPlay}
        file-animation={this.fileAnimation}
        id-el={this.idEl}
        is-open={this.isopen}
        loop={this.loop}
        text-label={this.mainText}
        type={this.loaderType}></sp-ml-loader>
    )
  };

  render() {
    const renderFn = this.loaderMap[this.type];
    return <div>{renderFn()}</div>;
  }
}
