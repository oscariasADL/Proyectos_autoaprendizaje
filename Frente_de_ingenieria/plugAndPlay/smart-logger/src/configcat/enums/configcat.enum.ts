import * as configcat from "configcat-js";

export enum ConfigCatLogLevel {
  DEBUG = "Debug",
  INFO = "Info",
  WARNING = "Warning",
  ERROR = "Error",
  OFF = "Off",
}

export const logLevelMap = {
  [ConfigCatLogLevel.DEBUG]: configcat.LogLevel.Debug,
  [ConfigCatLogLevel.INFO]: configcat.LogLevel.Info,
  [ConfigCatLogLevel.WARNING]: configcat.LogLevel.Warn,
  [ConfigCatLogLevel.ERROR]: configcat.LogLevel.Error,
  [ConfigCatLogLevel.OFF]: configcat.LogLevel.Off,
};

export const errorMessage = `SDK Key must be provided the first time getInstance is called.`;
