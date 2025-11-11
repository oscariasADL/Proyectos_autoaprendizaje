export const Keyboard = {
  async addListener(
    eventName:
      | 'keyboardDidHide'
      | 'keyboardDidShow'
      | 'keyboardWillShow'
      | 'keyboardWillHide',
    listenerFunc: (info: any) => void
  ): Promise<any> {
    return {};
  },

  removeAllListeners(): void {
    void 0;
  },

  async hide(): Promise<void> {
    console.log('hide');
  },

  async setAccessoryBarVisible(options: { isVisible: boolean }): Promise<void> {
    console.log('setAccessoryBarVisible');
  }
};

export interface KeyboardInfo {
  keyboardHeight: string;
}
