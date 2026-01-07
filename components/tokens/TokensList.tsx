'use client';

import { useEffect, useState } from 'react';
import { useTokensStore } from '@/stores/tokens.store';
import TokenRow from './TokenRow';
import Button from '@/components/ui/Button';

export default function TokensList() {
  const { tokens, totalTokens, fetchTokens, loading, error } = useTokensStore();
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    fetchTokens(status);
  }, [status]);

  return (
    <div>
      <h2>Tokens {status && status == 'AVAILABLE' ? 'Disponíveis' : status == 'ACTIVE' ? 'Ativos' : ''} ({totalTokens || 0})</h2>

      <div style={{ marginBottom: 12 }}>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos</option>
          <option value="AVAILABLE">Disponíveis</option>
          <option value="ACTIVE">Ativos</option>
        </select>

        <Button onClick={() => fetchTokens(status)}>
          Recarregar
        </Button>
      </div>

      {/* Loading state */}
      {loading && <p>Carregando tokens...</p>}

      {/* Error state */}
      {!loading && error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {/* Empty state */}
      {!loading && !error && tokens.length === 0 && (
        <p style={{ color: '#666' }}>
          Nenhum token {status === 'ACTIVE'
            ? 'ativo'
            : status === 'AVAILABLE'
            ? 'disponível'
            : 'encontrado'}.
        </p>
      )}

      {/* List */}
      {!loading && !error && tokens.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tokens.map(token => (
            <TokenRow key={token.id} token={token} />
          ))}
        </div>
      )}
    </div>
  );
}
