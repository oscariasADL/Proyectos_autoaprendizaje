export interface Config {
  environment: 'development' | 'staging' | 'production';
  showInProduction?: boolean;
  showInStage?: boolean;
  configCat?: ConfigCatOptions;
}

interface ConfigCatOptions {
  configCatKey: string;
  productionFlag: string;
  stageFlag?: string;
}

export type ConsoleParameter = unknown;
