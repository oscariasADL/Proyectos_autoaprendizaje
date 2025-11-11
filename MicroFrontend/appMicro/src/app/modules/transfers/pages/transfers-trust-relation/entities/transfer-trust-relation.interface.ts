export interface TrustRelationItem {
  nickname: string;
  phone: string;
}

export interface RemoveTrustRelationPayload {
  relativeId: string;
  phone: string;
}
