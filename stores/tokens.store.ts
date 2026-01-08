import { create } from 'zustand';
import { Token } from '@/types/token';
import * as service from '@/services/tokens.service';

interface TokensState {
  tokens: Token[];
  totalTokens: number;
  loadingTokens: boolean;
  lastClaimedToken: Token | null | undefined;
  loadingClaim: boolean;
  loadingClearActiveTokens: boolean;
  error?: string;
  status?: string;

  fetchTokens: (status?: string) => Promise<void>;
  claimToken: (userId: string) => Promise<void>;
  clearActiveTokens: () => Promise<void>;
}

export const useTokensStore = create<TokensState>((set, get) => ({
  tokens: [],
  totalTokens: 0,
  lastClaimedToken: undefined,
  loadingTokens: false,
  loadingClaim: false,
  loadingClearActiveTokens: false,
  error: undefined,
  status: undefined,

  fetchTokens: async (status?: string) => {
    try {
      set({ tokens: [], totalTokens: 0, loadingTokens: true, error: undefined, status });
      const response = await service.listTokens(status);
      set({ tokens: response.items, totalTokens: response.meta.total });
    } catch {
      set({ error: 'Erro ao carregar lista de tokens' });
    } finally {
      set({ loadingTokens: false });
    }
  },

  claimToken: async (userId: string) => {
    try {
      set({ loadingClaim: true, error: undefined, lastClaimedToken: null });
      const response = await service.claimToken(userId);
      const { status, fetchTokens } = get();
      await fetchTokens(status);
      set({ lastClaimedToken: response });
    } catch {
      set({ error: 'Erro ao realizar requisição de Token' });
    } finally {
      set({ loadingClaim: false });
    }
  },

  clearActiveTokens: async () => {
    try {
      set({ loadingClearActiveTokens: true, loadingTokens: true, error: undefined });
      await service.clearActiveTokens();
      const { status, fetchTokens } = get();
      await fetchTokens(status);
    } catch {
      set({ error: 'Erro ao limpar tokens ativos' });
    } finally {
      set({ loadingClearActiveTokens:false, loadingTokens: false });
    }
  },
}));
