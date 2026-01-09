'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import TokenHistory from '@/components/tokens/TokenHistory';
import { formatDate } from '@/utils/formatDate';
import type { Token, TokenHistoryItem } from '@/types/token';

import { getTokenById, getTokenHistory } from '@/services/tokens.service';

type Props = {
  tokenId: string;
  onClose: () => void;
};

export default function TokenDetailsModal({ tokenId, onClose }: Props) {
  const [token, setToken] = useState<Token | null>(null);
  const [history, setHistory] = useState<TokenHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [t, h] = await Promise.all([
          getTokenById(tokenId),
          getTokenHistory(tokenId),
        ]);

        if (!alive) return;

        setToken(t);
        setHistory(h);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? 'Falha ao carregar detalhes do token.');
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [tokenId]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        zIndex: 50,
      }}
      onMouseDown={onClose}
    >
      <div
        style={{
          width: 'min(920px, 100%)',
          maxHeight: '90vh',
          overflow: 'auto',
          background: '#fff',
          borderRadius: 12,
          padding: 16,
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Detalhes do Token</h2>
          <Button onClick={onClose}>X</Button>
        </div>

        {loading && <p>Carregando detalhes...</p>}
        {!loading && error && <p style={{ color: 'crimson' }}>{error}</p>}

        {!loading && !error && token && (
          <div>
              <Card>
                <p><strong>ID:</strong> {token.id}</p>
                <p>
                    <strong>Status:</strong>{' '}
                    {token.status === 'AVAILABLE'
                    ? 'Disponível'
                    : token.status === 'ACTIVE'
                    ? 'Ativo'
                    : 'Desativado'}
                </p>
                <p><strong>Usuário Atual:</strong> {token.currentUserId ?? '-'}</p>
                <p><strong>Última Atualização:</strong> {formatDate(token.updatedAt)}</p>
              </Card>

              <TokenHistory history={history} />
          </div>
            
        )}
      </div>
    </div>
  );
}
