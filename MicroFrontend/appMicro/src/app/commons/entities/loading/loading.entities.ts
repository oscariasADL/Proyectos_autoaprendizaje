export interface LoadingProperties {
  animated?: boolean;
  backdropDismiss?: boolean;
  cssClass?: string | string[] | undefined;
  duration?: number;
  keyboardClose?: boolean;
  message?: string;
  mode?: 'ios' | 'md';
  showBackdrop?: boolean;
  spinner?:
    | 'bubbles'
    | 'circles'
    | 'crescent'
    | 'dots'
    | 'lines'
    | 'lines-small'
    | null
    | undefined;
  translucent?: boolean;
}
