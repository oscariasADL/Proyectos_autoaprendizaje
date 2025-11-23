import { ConfigCatLogLevel } from "./configcat.enum";

export type HandlerInputProps = {
  sdkKey?: string;
  logLevel?: ConfigCatLogLevel;
  ttl?: number;
};
