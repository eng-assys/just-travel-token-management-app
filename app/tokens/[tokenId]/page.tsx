import { getTokenById, getTokenHistory } from '@/services/tokens.service';
import TokenHistory from '@/components/tokens/TokenHistory';
import BackButton from '@/components/ui/BackButton';
import { formatDate } from '@/utils/formatDate';

interface TokenPageProps {
  params: Promise<{
    tokenId: string;
  }>;
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { tokenId } = await params;

  const token = await getTokenById(tokenId);
  const history = await getTokenHistory(tokenId);

  return (
    <div>
        <BackButton />

        <h1>Detalhes do Token</h1>

        <p><strong>ID:</strong> {token.id}</p>
        <p><strong>Status:</strong> {token.status}</p>
        <p><strong>Usuário Atual:</strong> {token.currentUserId ?? '-'}</p>
        <p><strong>Última Atualização:</strong> {formatDate(token.updatedAt)}</p>

        <hr />

        <TokenHistory history={history} />
    </div>
  );
}
