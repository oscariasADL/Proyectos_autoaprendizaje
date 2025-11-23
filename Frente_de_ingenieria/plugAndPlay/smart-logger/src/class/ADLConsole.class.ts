import { ConfigCatHandler } from '../configcat/configcat.handler';
import { ConfigCatLogLevel } from '../configcat/enums/configcat.enum';
import { Config, ConsoleParameter } from '../types';

type PrintType = 'log' | 'error' | 'info' | 'warn';
export class ADLConsole {
  private static instance: ADLConsole | null = null;
  private config: Config = {
    showInProduction: false,
    showInStage: false,
    environment: 'development'
  };
  private ConfigCatHandler: ConfigCatHandler | null = null;
  private isAllowed: boolean = false;

  private originalConsole = {
    log: console.log,
    error: console.error,
    info: console.info,
    warn: console.warn
  };

  constructor(configInit: Config) {
    if (ADLConsole.instance) {
      return ADLConsole.instance;
    }
    this.config = configInit;
    if (this.config.configCat) {
      this.ConfigCatHandler = ConfigCatHandler.getInstance({
        sdkKey: this.config.configCat.configCatKey,
        logLevel: ConfigCatLogLevel.INFO,
        ttl: 1800
      });
    }

    this.validateExceptions();
    this.disableNativeOptions();
    ADLConsole.instance = this;
  }

  private disableNativeOptions() {
    if (this.isAllowed) return;
    window.console.log = () => {};
    window.console.error = () => {};
    window.console.info = () => {};
    window.console.warn = () => {};
  }

  private print(type: PrintType, ...parameters: ConsoleParameter[]) {
    if (this.isAllowed) {
      this.originalConsole[type](...parameters);
    }
  }

  private validateExceptions() {
    if (this.config.environment === 'development') {
      this.isAllowed = true;
      return;
    }
    const configCatFlag =
      this.config.environment === 'production'
        ? this.config.configCat?.productionFlag
        : this.config.configCat?.stageFlag;
    const configFlag =
      this.config.environment === 'production'
        ? this.config.showInProduction
        : this.config.showInStage;
    if (configCatFlag) {
      this.ConfigCatHandler?.getFeatureFlag(configCatFlag).then((isAllowed) => {
        this.isAllowed = isAllowed as boolean;
      });
    } else {
      this.isAllowed = configFlag ?? false;
    }
  }

  log(...parameters: ConsoleParameter[]) {
    this.print('log', ...parameters);
  }

  error(...parameters: ConsoleParameter[]) {
    this.print('error', ...parameters);
  }

  info(...parameters: ConsoleParameter[]) {
    this.print('info', ...parameters);
  }

  warn(...parameters: ConsoleParameter[]) {
    this.print('warn', ...parameters);
  }
}
