'use client';

import Button from '@/components/ui/Button';
import { clearActiveTokens } from '@/services/tokens.service';

export default function ClearActiveTokensButton() {
  async function handleClear() {
    try {
      await clearActiveTokens();
      alert('Tokens limpos com sucesso');
    } catch {
      alert('Erro ao limpar tokens');
    }
  }

  return (
    <Button onClick={handleClear}>
      Limpar Tokens Ativos
    </Button>
  );
}
