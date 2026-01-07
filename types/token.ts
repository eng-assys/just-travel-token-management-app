export type TokenStatus = 'AVAILABLE' | 'ACTIVE';

export interface Token {
  id: string;
  status: TokenStatus;
  updatedAt?: string;
  currentUserId?: string;
}

export interface TokenHistoryItem {
  userId: string;
  activatedAt: string;
  releasedAt: string | null;
}
