import ClaimTokenForm from '@/components/tokens/ClaimTokenForm';
import TokensList from '@/components/tokens/TokensList';
import ClearActiveTokensButton from '@/components/tokens/ClearActiveTokensButton';
import Card from '@/components/ui/Card';

export default function TokensPage() {
  return (
    <main>
      <h1>Tokens</h1>
      <Card title="Ações">
        <ClaimTokenForm />
        <ClearActiveTokensButton />
      </Card>

      <Card title="Tokens">
        <TokensList />
      </Card>

    </main>
  );
}
