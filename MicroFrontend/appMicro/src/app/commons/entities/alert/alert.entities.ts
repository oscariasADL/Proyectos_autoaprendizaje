export interface AlertProperties {
  header?: string;
  subHeader?: string;
  message?: string;
  buttons?: Array<string>;
}

export const DEFAULT_ALERT_PROPERTIES: AlertProperties = {
  header: 'Error',
  message: 'Error desconocido',
  buttons: ['OK']
};
