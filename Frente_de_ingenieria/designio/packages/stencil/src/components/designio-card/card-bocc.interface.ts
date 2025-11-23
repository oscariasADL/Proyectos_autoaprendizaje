/**
 * BOCC
 */
export interface BdoCardStandard {
  card?: BdoCardConfig;
  header?: BdoCardHeaderAndFooter;
  footer?: BdoCardHeaderAndFooter;
}

interface BdoCardHeaderAndFooter {
  id?: string;
  display?: boolean;
}

export interface BdoCardConfig {
  id?: string;
  borderType?: BdoCardBorderType;
}

type BdoCardBorderType = 'default' | 'info' | 'success' | 'darger';
