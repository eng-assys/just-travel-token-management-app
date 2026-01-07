import { getTokenById, getTokenHistory } from '@/services/tokens.service';
import BackButton from '@/components/ui/BackButton';

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
        <p><strong>Current User:</strong> {token.currentUserId ?? '-'}</p>
        <p><strong>Updated At:</strong> {token.updatedAt ?? '-'}</p>

        <hr />
    </div>
  );
}
