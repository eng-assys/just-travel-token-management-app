'use client';

import Button from '@/components/ui/Button';
import { useTokensStore } from '@/stores/tokens.store';

export default function ClearActiveTokensButton() {
  const { loadingClearActiveTokens, clearActiveTokens } = useTokensStore();

  async function handleClear() {
    await clearActiveTokens();
  }

  return (
    <Button onClick={handleClear} disabled={loadingClearActiveTokens}>
      {loadingClearActiveTokens ? 'Limpando...' : 'Limpar Tokens Ativos'}
    </Button>
  );
}
