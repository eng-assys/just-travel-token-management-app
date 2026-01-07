import { create } from 'zustand';
import { Token } from '@/types/token';
import * as service from '@/services/tokens.service';

interface TokensState {
  tokens: Token[];
  loading: boolean;
  error?: string;
  fetchTokens: (status?: string) => Promise<void>;
}

export const useTokensStore = create<TokensState>((set) => ({
  tokens: [],
  loading: false,

  fetchTokens: async (status) => {
    try {
      set({ loading: true, error: undefined });
      const response = await service.listTokens(status);
      set({ tokens: response.items });
    } catch {
      set({ error: 'Erro ao carregar tokens' });
    } finally {
      set({ loading: false });
    }
  },
}));
