export const FirebaseCrashlytics = {
  async setUserId({ userId: string }): Promise<any> {
    return {};
  },
  async recordException(options: {
    message: string;
    stacktrace: StackFrame[];
  }): Promise<any> {
    return {};
  }
};

export interface StackFrame {
  lineNumber?: number;
  fileName?: string;
  functionName?: string;
}
