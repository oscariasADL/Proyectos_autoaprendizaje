export interface LogMessageDetails {
  severity: LogSeverity;
  fileName: string;
  functionName: string;
  customMessage: string;
  userId?: string;
  error?: any;
}

export enum LogSeverity {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}
