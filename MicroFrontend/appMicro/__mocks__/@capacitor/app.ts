export const App = {
  async getInfo(): Promise<any> {
    return Promise.resolve({
      version: '1.0.0',
      name: '',
      id: '',
      build: ''
    });
  },
  async removeAllListeners(): Promise<void> {
    return Promise.resolve();
  },
  async addListener(eventName, listenerFunc): Promise<any> {
    return Promise.resolve({});
  },
  async exitApp(): Promise<void> {}
};

export interface AppInfo {
  version: string;
  name: string;
  id: string;
  build: string;
}

export interface URLOpenListenerEvent {
  url: string;
  iosSourceApplication?: any;
  iosOpenInPlace?: boolean;
}
