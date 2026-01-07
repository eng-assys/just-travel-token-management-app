'use client';

import { useEffect, useState } from 'react';
import { useTokensStore } from '@/stores/tokens.store';
import TokenRow from './TokenRow';
import Button from '@/components/ui/Button';

export default function TokensList() {
  const { tokens, fetchTokens, loading } = useTokensStore();
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    fetchTokens(status);
  }, [status]);

  return (
    <div>
      <h2>Tokens</h2>

      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">Todos</option>
        <option value="AVAILABLE">Disponíveis</option>
        <option value="ACTIVE">Ativos</option>
      </select>

      <Button onClick={() => fetchTokens(status)}>Recarregar</Button>

      {loading && <p>Carregando...</p>}

      {tokens.map(token => (
        <TokenRow key={token.id} token={token} />
      ))}
    </div>
  );
}
