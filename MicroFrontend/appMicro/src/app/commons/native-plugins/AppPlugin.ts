import { Capacitor } from '@capacitor/core';
import { App, AppInfo } from '@capacitor/app';

export class AppPlugin {
  public static readonly App = App;

  public static getInfo(): Promise<AppInfo> {
    return Capacitor.isNativePlatform()
      ? App.getInfo()
      : Promise.resolve({
          version: '4.32.0',
          name: 'AV VIllas App',
          build: '12117',
          id: '7974b3e3-1464-41e8-a2f6-9b7121c44902'
        });
  }
}
