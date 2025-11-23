import * as configcat from "configcat-js";
import { ConfigCatUser } from "./configcat-user.model";
import {
  ConfigCatLogLevel,
  errorMessage,
  logLevelMap,
} from "./enums/configcat.enum";
import { ConfigCatUtility } from "./configcat-utility";
import { HandlerInputProps } from "./enums/handler-input.type";

class ConfigCatHandler {
  private static instance: ConfigCatHandler | null;
  private static sdkKey: string;
  private static logLevel: ConfigCatLogLevel;
  private static ttl: number;
  private client: configcat.IConfigCatClient;

  private constructor() {
    const logger = configcat.createConsoleLogger(
      logLevelMap[ConfigCatHandler.logLevel]
    );
    this.client = configcat.getClient(
      ConfigCatHandler.sdkKey,
      configcat.PollingMode.LazyLoad,
      {
        cacheTimeToLiveSeconds: ConfigCatHandler.ttl,
        logger: logger,
      }
    );
  }

  public static getInstance(properties?: HandlerInputProps): ConfigCatHandler {
    if (!ConfigCatHandler.instance) {
      if (!properties || !properties.sdkKey) {
        throw new Error(errorMessage);
      }
      ConfigCatHandler.sdkKey = properties.sdkKey;
      ConfigCatHandler.logLevel = properties.logLevel
        ? properties.logLevel
        : ConfigCatLogLevel.OFF;
      ConfigCatHandler.ttl = properties.ttl ? properties.ttl : 1800;
      ConfigCatHandler.instance = new ConfigCatHandler();
    }
    return ConfigCatHandler.instance;
  }

  public async getFeatureFlag(
    featureKey: string,
    user?: ConfigCatUser
  ): Promise<boolean> {
    return ConfigCatUtility.findFeatureValue(
      await this.getAllFeaturesForUser(user),
      featureKey
    );
  }

  private async getAllFeaturesForUser(
    user?: ConfigCatUser
  ): Promise<configcat.SettingKeyValue[]> {
    const userObject = ConfigCatUtility.buildUserObject(user);
    return await this.client.getAllValuesAsync(userObject);
  }
}

export { ConfigCatHandler };
