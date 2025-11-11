export const downloadFeatureName = 'downloadModuleState';

export type DownloadState = Readonly<{
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialDownloadState: DownloadState = {
  working: false,
  completed: null,
  message: ''
};
