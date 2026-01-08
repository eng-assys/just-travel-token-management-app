'use client';

import ClaimTokenForm from '@/components/tokens/ClaimTokenForm';
import TokensList from '@/components/tokens/TokensList';
import ClearActiveTokensButton from '@/components/tokens/ClearActiveTokensButton';
import Card from '@/components/ui/Card';
import { useTokensStore } from '@/stores/tokens.store';
import Message from '@/components/ui/MessageBanner';

export default function TokensPage() {
  const { loadingTokens, loadingClaim, loadingClearActiveTokens, message } = useTokensStore();

  return (
    <main>
      <h1>Gerenciamento de Tokens</h1>

      {/* Error state */}
      {!loadingTokens && !loadingClaim && !loadingClearActiveTokens && message && (
        <Message text={message.text} isError={message.isError} />
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
