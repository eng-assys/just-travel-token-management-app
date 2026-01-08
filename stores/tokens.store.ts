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
  message?: MessageState;
  status?: string;

  fetchTokens: (status?: string) => Promise<void>;
  claimToken: (userId: string) => Promise<void>;
  clearActiveTokens: () => Promise<void>;
}
interface MessageState {
  text: string;
  isError: boolean;
}

export const useTokensStore = create<TokensState>((set, get) => ({
  tokens: [],
  totalTokens: 0,
  lastClaimedToken: undefined,
  loadingTokens: false,
  loadingClaim: false,
  loadingClearActiveTokens: false,
  message: undefined,
  status: undefined,

  fetchTokens: async (status?: string) => {
    try {
      set({ tokens: [], totalTokens: 0, loadingTokens: true, message: undefined, status });
      const response = await service.listTokens(status);
      set({ tokens: response.items, totalTokens: response.meta.total });
    } catch {
      set({ message: { text: 'Erro ao carregar lista de tokens', isError: true } });
    } finally {
      set({ loadingTokens: false });
    }
  },

  claimToken: async (userId: string) => {
    try {
      set({ loadingClaim: true, message: undefined, lastClaimedToken: null });
      const response = await service.claimToken(userId);
      const { status, fetchTokens } = get();
      await fetchTokens(status);
      set({ lastClaimedToken: response, message: { text: 'Token solicitado com sucesso', isError: false } });
    } catch {
      set({ message: { text: 'Erro ao realizar requisição de Token', isError: true } });
    } finally {
      set({ loadingClaim: false });
    }
  },

  clearActiveTokens: async () => {
    try {
      set({ loadingClearActiveTokens: true, loadingTokens: true, message: undefined });
      await service.clearActiveTokens();
      const { status, fetchTokens } = get();
      await fetchTokens(status);
      set({ message: { text: 'Tokens ativos limpos com sucesso', isError: false } });
    } catch {
      set({ message: { text: 'Erro ao limpar tokens ativos', isError: true } });
    } finally {
      set({ loadingClearActiveTokens:false, loadingTokens: false });
    }
  },
}));
