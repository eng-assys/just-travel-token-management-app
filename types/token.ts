export type TokenStatus = 'AVAILABLE' | 'ACTIVE';

export interface Token {
  id: string;
  status: TokenStatus;
  updatedAt?: string;
  currentUserId?: string;
  isTokenReleasedFromOlderActivation?: boolean;
}

export interface TokenHistoryItem {
  userId: string;
  activatedAt: string;
  releasedAt: string | null;
}
