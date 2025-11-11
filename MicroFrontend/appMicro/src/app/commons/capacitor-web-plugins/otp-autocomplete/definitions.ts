import { PluginListenerHandle } from '@capacitor/core';

export interface OtpAutocompletePlugin {
  listenOtpOnAndroid(
    arg: OtpAutocompleteOptions
  ): Promise<{ success: boolean }>;

  addListener(
    eventName: 'otpReceivedEvent',
    listenerCallback: (data: OtpAutocompleteResponse) => void
  ): Promise<PluginListenerHandle>;
}

export interface OtpAutocompleteOptions {
  /**
   * It is the phone number from which the sms arrives
   */
  senderCode: string;
}

export interface OtpAutocompleteResponse {
  success: boolean;
  otp: string;
  msg: string;
}
