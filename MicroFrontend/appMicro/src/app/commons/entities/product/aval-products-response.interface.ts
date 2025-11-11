export enum PorvenirProductType {
  MANDATORY_PENSIONS = 1,
  VOLUNTARY_PENSIONS = 2,
  CESANTIAS = 3
}

export interface PortfolioI {
  valuationBalance: number;
  unitValue: number;
  units: number;
  portfolioType?: string;
  totalBalance?: string;
  valorizationBalance?: string;
  currentBalance?: string;
}

export interface PorvenirProductI {
  productType: PorvenirProductType;
  productName: string;
  productNumber: string;
  amount: number;
  portfolios: PortfolioI[];
}

export interface PorvenirResponseI {
  data: PorvenirProductI[];
}

export interface TuPlusResponseI {
  activeAfilliation: string | boolean;
  totalPoints: number;
  pointsPerBank: PointsPerBankI[];
}

export interface PointsPerBankI {
  bankName: string;
  bankPoints: string;
}
