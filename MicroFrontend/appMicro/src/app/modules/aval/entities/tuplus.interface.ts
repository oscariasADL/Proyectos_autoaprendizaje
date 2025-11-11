export interface PointsPerBank {
  bankName: string;
  bankPoints: string;
}

export interface TuplusProduct {
  activeAfilliation: string | boolean;
  totalPoints: number;
  pointsPerBank: PointsPerBank[];
}
