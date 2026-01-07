'use client';

import ClaimTokenForm from '@/components/tokens/ClaimTokenForm';
import TokensList from '@/components/tokens/TokensList';
import ClearActiveTokensButton from '@/components/tokens/ClearActiveTokensButton';
import Card from '@/components/ui/Card';
import { useTokensStore } from '@/stores/tokens.store';

export default function TokensPage() {
  const { loading, error } = useTokensStore();

  return (
    <main>
      <h1>Tokens</h1>

      {/* Error state */}
      {!loading && error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      <Card title="Ações">
        <ClaimTokenForm />
        <ClearActiveTokensButton />
      </Card>

      <Card title="Lista de Tokens">
        <TokensList />
      </Card>

    </main>
  );
}
