import { NavController } from '@ionic/angular';
import { AvvIconsBtnList } from '@commons/entities/avv-icons-btn-list/AvviconsBtnList.entities';

export abstract class BaseButtonHelper {
  protected abstract readonly BASE_BUTTONS: AvvIconsBtnList[];
  protected abstract readonly ADDITIONAL_BUTTONS: AvvIconsBtnList[];

  public getButtonState(
    navCtrl: NavController,
    showAdditionalButtons: boolean
  ): AvvIconsBtnList[] {
    const baseButtons = this.BASE_BUTTONS.map((button) => ({
      ...button,
      action: () => button.action(navCtrl)
    }));

    if (!showAdditionalButtons) {
      return baseButtons;
    }

    const additionalButtons = this.ADDITIONAL_BUTTONS.map((button) => ({
      ...button,
      action: () => button.action(navCtrl)
    }));

    return [...baseButtons, ...additionalButtons];
  }
}
