import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Token } from '@/types/token';

export default function TokenRow({ token }: { token: Token }) {
  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href={`/tokens/${token.id}`}>
          {token.id}
        </Link>

        <Badge status={token.status} />
      </div>
    </Card>
  );
}
