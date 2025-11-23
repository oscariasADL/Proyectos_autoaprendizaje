import * as configcat from "configcat-js";
import { ConfigCatUser } from "./configcat-user.model";
import { SettingKeyValue } from "configcat-js";

class ConfigCatUtility {
  public static findFeatureValue(
    features: SettingKeyValue[],
    featureKey: string
  ): boolean {
    const featureFound = features.find(
      (feature) => feature.settingKey === featureKey
    );
    return (featureFound?.settingValue as boolean) ?? false;
  }

  public static buildUserObject(
    user?: ConfigCatUser
  ): configcat.User | undefined {
    if (!user) {
      return undefined;
    }
    return {
      identifier: user.identifier,
      email: user.email,
      country: user.country,
      custom: user.custom || {},
    };
  }
}

export { ConfigCatUtility };
