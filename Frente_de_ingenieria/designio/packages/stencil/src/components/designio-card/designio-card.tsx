import { Component, EventEmitter, Event, h, Prop } from '@stencil/core';
import { BdoCardStandard, BdoCardConfig } from './card-bocc.interface';
import { PaddingForCard } from './card-bavv.interface';
import {
  INotification,
  IOverflowMenu
} from '@npm-bbta/bbog-dig-dt-sherpa-lib/loader';

@Component({
  tag: 'designio-card',
  styleUrl: 'designio-card.scss',
  shadow: true
})
export class DesignioCard {
  /**
   * Type or entity form buttom
   */
  @Prop() type: 'bocc' | 'bavv' | 'bbog' | 'bpop' = 'bocc';
  /**
   * Type of card for BBOG
   */
  @Prop() cardType: 'access' | 'notification' = 'access';
  /**
   * Id of card
   */
  @Prop({ mutable: false }) idCard?: string;
  /**
   * id of header (BOCC only)
   */
  @Prop({ mutable: false }) idHeader?: string;
  /**
   * id of footer (BOCC only)
   */
  @Prop({ mutable: false }) idFooter?: string;
  /**
   * enable header of card (BOCC only)
   */
  @Prop({ mutable: false }) displayHeader?: boolean = false;
  /**
   * enable footer of card (BOCC only)
   */
  @Prop({ mutable: false }) displayFooter?: boolean = false;
  /**
   * type of border for card (BOCC only)
   */
  @Prop({ mutable: false }) borderType?:
    | 'default'
    | 'info'
    | 'success'
    | 'darger' = 'default';

  /**
   * Text used for footer (only BOCC)
   */
  @Prop({ mutable: false }) footerText?: string;

  /**
   * Text used for header (only BOCC)
   */
  @Prop({ mutable: false }) headerText?: string;
  /**
   * Padding of component, it can have 3 values: 12 | 24 | 36 (BAVV only)
   * */
  @Prop({ mutable: false }) cardPadding: PaddingForCard = 12;
  /**
   * Border contain card, if false it does not show (BAVV only)
   */
  @Prop({ mutable: false }) cardHasBorder: boolean = false;

  /**
   * Text body of card
   */
  @Prop({ mutable: false }) bodyText?: string;

  /**
   * Text used for button (Only for BBOG)
   */
  @Prop({ mutable: false }) buttonText?: string = '';
  /**
   * Text used for secondary button (Only for BBOG card notification)
   */
  @Prop({ mutable: false }) buttonTextSecondary?: string;
  /**
   * Text used for tag (Only for BBOG)
   */
  @Prop({ mutable: false }) tagLabel?: string;
  /**
   * Text secondary  of card (only BBOG)
   */
  @Prop({ mutable: false }) secondaryText?: string;
  /**
   * Type of logo for access card (Only for BBOG)
   */
  @Prop({ mutable: false }) typeLogo?: string;
  /**
   * width of card (Only for BBOG)
   */
  @Prop({ mutable: false }) boxWidth?: string;
  /**
   * height of card (Only for BBOG)
   */
  @Prop({ mutable: false }) boxHeight?: string;
  /**
   * define if it's button or link for access card in true for button, in notification define if has two buttons
   * (Only for BBOG)
   */
  @Prop({ mutable: false }) hasButtons?: boolean = false;
  /**
   * define title for card (Only for BBOG)
   */
  @Prop({ mutable: false }) titleCard?: string = '';
  /**
   * define type icon (Only for BBOG)
   */
  @Prop({ mutable: false }) typeIcon?: string;
  /**
   * define type tag (Only for BBOG)
   */
  @Prop({ mutable: false }) typeTag?: string;
  /**
   * define avatar type (Only for BBOG)
   */
  @Prop({ mutable: false }) typeAvatar?: 'text' | 'icon' | 'img' = 'icon';
  /**
   * text for avatar (Only for BBOG)
   */
  @Prop({ mutable: false }) textAvatar?: string;
  /**
   * define tag solid or with border (Only for BBOG)
   */
  @Prop({ mutable: false }) isTagSolid?: boolean = false;
  /**
   * link for image of avatar (Only for BBOG)
   */
  @Prop({ mutable: false }) urlImgAvatar?: string;
  /**
   * define title in one line or two (Only for BBOG)
   */
  @Prop({ mutable: false }) titleHasOneLine?: boolean;
  /**
   * enable or disable component (Only for BBOG access) and used for badge in avatar (Only for BBOG notification)
   */
  @Prop({ mutable: false }) enable?: boolean;
  /**
   * define color for text in avatar (Only for BBOG)
   */
  @Prop({ mutable: false }) colorTextAvatar?: string;
  /**
   * define type for pictogram (Only for BBOG)
   */
  @Prop({ mutable: false }) typePicto?: string;
  /**
   * define if it's button or link (Only for BBOG)
   */
  @Prop({ mutable: false }) buttonType?: 'link' | 'secondary' = 'link';
  /**
   * define state of card (Only for BBOG)
   */
  @Prop({ mutable: false }) unread?: boolean = false;
  /**
   * options for card in bbog (Only for BBOG)
   */
  @Prop({ mutable: false }) userOptions?: string;
  /**
   * Event emitted when the card is clicked (Only for BBOG)
   */
  @Event() cardClicked: EventEmitter<void>;
  /**
   * Event emitted for button or link (Only for BBOG)
   */
  @Event() linkClicked: EventEmitter<void>;
  /**
   * Event emitted for secondary button (Only for BBOG)
   */
  @Event() linkClickedSecond: EventEmitter<void>;
  /**
   * Event emitted for options menu (Only for BBOG)
   */
  @Event() optionMenuClicked: EventEmitter<void>;

  private onCardClicked = (event: any) => {
    this.cardClicked.emit(event);
  };
  private onLinkClicked = (event: any) => {
    this.linkClicked.emit(event);
  };
  private onLinkClickedSecond = (event: any) => {
    this.linkClickedSecond.emit(event);
  };
  private onOptionMenuClicked = (event: any) => {
    this.optionMenuClicked.emit(event);
  };
  private cardMap: Record<DesignioCard['type'], () => any> = {
    bocc: () => {
      const card: BdoCardConfig = {
        id: this.idCard,
        borderType: this.borderType
      };
      const configCard: BdoCardStandard = {
        card,
        header: {
          id: this.idHeader,
          display: this.displayHeader
        },
        footer: {
          id: this.idFooter,
          display: this.displayFooter
        }
      };
      return (
        <bdo-card configCard={configCard}>
          <div slot="header-card">
            <slot name="header-card">{this.headerText}</slot>
          </div>

          <div slot="body-card">
            <slot name="body-card">{this.bodyText}</slot>
          </div>

          <div slot="footer-card">
            <slot name="footer-card">{this.footerText}</slot>
          </div>
        </bdo-card>
      );
    },
    bavv: () => {
      return (
        <bavv-designio-card
          cardPadding={this.cardPadding}
          cardHaveBorder={this.cardHasBorder}>
          <slot name="body-card">{this.bodyText}</slot>
        </bavv-designio-card>
      );
    },

    bbog: () => {
      const cardTypeMap: Record<DesignioCard['cardType'], () => any> = {
        access: () => (
          <sp-ml-access-card
            idEl={this.idCard}
            titleLabel={this.titleCard}
            tagLabel={this.tagLabel}
            descLabel={this.bodyText}
            typeLogo={this.typeLogo}
            typeIcon={this.typeIcon}
            typeTag={this.typeTag}
            tagSolid={this.isTagSolid}
            typeAvatar={this.typeAvatar}
            textAvatar={this.textAvatar}
            urlImgAvatar={this.urlImgAvatar}
            obfusTitle={this.titleHasOneLine}
            enable={this.enable}
            colorTextAvatar={this.colorTextAvatar}
            boxWidth={this.boxWidth}
            boxHeight={this.boxHeight}
            typePicto={this.typePicto}
            button={this.buttonText}
            action={this.hasButtons}
            onCardClicked={this.onCardClicked}
            onLinkDetailClicked={this.onLinkClicked}
          />
        ),
        notification: () => {
          const valuesToCard: INotification[] = [
            {
              id: this.idCard,
              title: this.titleCard,
              desc: this.bodyText,
              hour: this.secondaryText,
              textButton: this.buttonText,
              textButton2: this.buttonTextSecondary,
              typeButton: this.buttonType,
              buttons: this.hasButtons,
              tagName: this.tagLabel,
              tagType: this.typeTag,
              unread: this.unread,
              optionsMenu: (this.userOptions && this.userOptions.trim() !== ''
                ? JSON.parse(this.userOptions)
                : []) as IOverflowMenu[],
              typeAvatar: this.typeAvatar,
              avatar: {
                icon: this.typeIcon,
                image: this.urlImgAvatar,
                color: this.colorTextAvatar,
                text: this.textAvatar,
                badge: this.enable
              }
            }
          ];
          return (
            <sp-ml-notification-card
              valuesToCard={JSON.stringify(valuesToCard)}
              onCardClicked={this.onCardClicked}
              onLinkDetailClicked={this.onLinkClicked}
              onLinkDetailClickedSecond={this.onLinkClickedSecond}
              onOptionMenuClicked={
                this.onOptionMenuClicked
              }></sp-ml-notification-card>
          );
        }
      };

      const renderCard = cardTypeMap[this.cardType];
      return <div>{renderCard?.()}</div>;
    },
    bpop: () => {
      return <div></div>;
    }
  };
  render() {
    const renderFn = this.cardMap[this.type];
    return <div>{renderFn()}</div>;
  }
}
