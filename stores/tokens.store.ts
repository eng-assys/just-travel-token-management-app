import { create } from 'zustand';
import { Token } from '@/types/token';
import * as service from '@/services/tokens.service';

interface TokensState {
  tokens: Token[];
  totalTokens: number;
  loading: boolean;
  error?: string;
  status?: string;

  fetchTokens: (status?: string) => Promise<void>;
  claimToken: (userId: string) => Promise<void>;
}

export const useTokensStore = create<TokensState>((set, get) => ({
  tokens: [],
  totalTokens: 0,
  lastClaimedToken: undefined,
  loading: false,
  error: undefined,
  status: undefined,

  fetchTokens: async (status?: string) => {
    set({ loading: true, error: undefined, status });

    try {
      const response = await service.listTokens(status);
      set({ tokens: response.items, totalTokens: response.meta.total });
    } catch {
      set({ error: 'Erro ao carregar lista de tokens' });
    } finally {
      set({ loading: false });
    }
  },

  claimToken: async (userId: string) => {
    try {
      set({ loading: true, error: undefined, lastClaimedToken: null });
      const response = await service.claimToken(userId);
      const { status, fetchTokens } = get();
      await fetchTokens(status);
      set({ lastClaimedToken: response });
    } catch {
      set({ error: 'Erro ao realizar requisição de Token' });
    } finally {
      set({ loading: false });
    }
  },
}));
