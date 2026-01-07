'use client';

import { useState } from 'react';
import { useTokensStore } from '@/stores/tokens.store';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { formatDate } from '@/utils/formatDate';

export default function ClaimTokenForm() {
  const [userId, setUserId] = useState('');

  const { lastClaimedToken, claimToken, loadingClaim } = useTokensStore();

  async function handleSubmit() {
    if (!userId) return;
    await claimToken(userId);
  }

  return (
    <div>
      <h2>Requisitar Token</h2>

      <Input
        placeholder="ID do Usuário (UUID)"
        value={userId}
        onChange={(e: any) => setUserId(e.target.value)}
      />

      <Button onClick={handleSubmit} disabled={loadingClaim}>
        {loadingClaim ? 'Solicitando...' : 'Solicitar Token'}
      </Button>

      {lastClaimedToken && (
        <div style={{ marginTop: 12 }}>
          <p><strong>Token:</strong> {lastClaimedToken.id}</p>
          <p><strong>Atualizado em:</strong> {formatDate(lastClaimedToken.updatedAt)}</p>
          <p><strong>Usuário Atual:</strong> {lastClaimedToken.currentUserId}</p>
        </div>
      )}
    </div>
  );
}
