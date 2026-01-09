'use client';

import { useEffect, useState } from 'react';
import { useTokensStore } from '@/stores/tokens.store';
import TokenRow from './TokenRow';
import Button from '@/components/ui/Button';
import TokenDetailsModal from '@/components/tokens/TokenDetailsModal';

export default function TokensList() {
  const { tokens, totalTokens, fetchTokens, loadingTokens } = useTokensStore();
  const [status, setStatus] = useState<string>();
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);

  useEffect(() => {
    fetchTokens(status);
  }, [status]);

  return (
    <div>
      <h2>
        Tokens {status && status == 'AVAILABLE' ? 'Disponíveis' : status == 'ACTIVE' ? 'Ativos' : ''} ({totalTokens || 0})
      </h2>

      <div style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <select onChange={(e) => setStatus(e.target.value)} value={status ?? ''}>
          <option value="">Todos</option>
          <option value="AVAILABLE">Disponíveis</option>
          <option value="ACTIVE">Ativos</option>
        </select>

        <Button onClick={() => fetchTokens(status)}>Recarregar</Button>
      </div>

      {loadingTokens && <p>Carregando tokens...</p>}

      {!loadingTokens && tokens.length === 0 && (
        <p style={{ color: '#666' }}>
          Nenhum token {status === 'ACTIVE' ? 'ativo' : status === 'AVAILABLE' ? 'disponível' : 'encontrado'}.
        </p>
      )}

      {!loadingTokens && tokens.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tokens.map((token) => (
            <TokenRow
              key={token.id}
              token={token}
              onOpenDetails={() => setSelectedTokenId(token.id)}
            />
          ))}
        </div>
      )}

      {selectedTokenId && (
        <TokenDetailsModal
          tokenId={selectedTokenId}
          onClose={() => setSelectedTokenId(null)}
        />
      )}
    </div>
  );
}
