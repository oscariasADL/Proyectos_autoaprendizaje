export enum AlignTitle {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

export enum ModalTypeBpop {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DEFAULT = 'default'
}

export enum DirectionButtons {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export enum ModalSizeBpop {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  X_LARGE = 'x-large'
}

export enum ModalVariantBpop {
  DEFAULT = 'default',
  FULLSCREEN = 'fullscreen',
  SIDEBAR = 'sidebar'
}

export enum ModalPositionBpop {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right'
}

export interface ModalBpopProps {
  titleModal?: string;
  alignTitle?: AlignTitle;
  directionButton?: DirectionButtons;
  showCloseButton?: boolean;
  icon?: string;
  textConfirmButton?: string;
  textCancelButton?: string;
  textCloseButton?: string;
  type?: ModalTypeBpop;
  isOpen?: boolean;
}
