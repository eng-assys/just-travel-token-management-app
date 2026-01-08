'use client';

import { useState } from 'react';
import { useTokensStore } from '@/stores/tokens.store';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { formatDate } from '@/utils/formatDate';
import Card from '../ui/Card';

export default function ClaimTokenForm() {
  const [userId, setUserId] = useState('');

  const { lastClaimedToken, claimToken, loadingClaim } = useTokensStore();

  async function handleSubmit() {
    if (!userId) return;
    await claimToken(userId);
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 32,
          alignItems: 'stretch',
          marginTop: 24,
        }}
      >
        {/* Requisitar Token */}
        <div style={{ flex: 1 }}>
          <Card title="Requisitar Token">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <Input
                placeholder="ID do Usuário (UUID)"
                value={userId}
                onChange={(e: any) => setUserId(e.target.value)}
              />

              <Button
                onClick={handleSubmit}
                disabled={loadingClaim}
                style={{ alignSelf: 'flex-start' }}
              >
                {loadingClaim ? 'Solicitando...' : 'Solicitar Token'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Último Token */}
        <div style={{ flex: 1 }}>
          <Card title="Último Token Requisitado">
            {lastClaimedToken ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  marginTop: 8,
                }}
              >
                <p>
                  <strong>ID:</strong>{' '}
                  <span style={{ fontFamily: 'roboto' }}>
                    {lastClaimedToken.id}
                  </span>
                </p>

                <p>
                  <strong>Usuário Atual:</strong>{' '}
                  <span style={{ fontFamily: 'roboto' }}>
                    {lastClaimedToken.currentUserId}
                  </span>
                </p>

                <p>
                  <strong>Liberação Forçada?:</strong>{' '}
                  {lastClaimedToken.isTokenReleasedFromOlderActivation ? 'Sim' : 'Não'}
                </p>

                <p>
                  <strong>Atualizado em:</strong>{' '}
                  {formatDate(lastClaimedToken.updatedAt)}
                </p>
              </div>
            ) : (
              <p style={{ color: '#777', marginTop: 8 }}>
                Nenhum token requisitado ainda.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );


}
