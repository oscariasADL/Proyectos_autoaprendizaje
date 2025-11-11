import { WebPlugin } from '@capacitor/core';
import { OtpAutocompleteOptions, OtpAutocompletePlugin } from './definitions';

export class OtpAutocompletePluginWeb
  extends WebPlugin
  implements OtpAutocompletePlugin
{
  public async listenOtpOnAndroid(
    arg: OtpAutocompleteOptions
  ): Promise<{ success: boolean }> {
    setTimeout(() => {
      this.notifyListeners('otpReceivedEvent', {
        success: true,
        otp: '12345678',
        msg: ''
      });
    }, 1000);
    return { success: true };
  }
}
