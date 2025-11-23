export enum AlignTitleBavv {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

export enum ModalTypeBavv {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export enum DirectionButtonsBavv {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export interface BavvButtonStandard {
  id: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'borderless';
  size?: 'small' | 'regular';
  widthMode?: 'default' | 'modal' | 'full';
  prefixIcon?: string;
  suffixIcon?: string;
  disabled?: boolean;
  onClick?: () => void;
}
