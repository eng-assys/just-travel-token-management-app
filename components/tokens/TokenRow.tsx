import Link from 'next/link';
import { Token } from '@/types/token';
import Badge from '@/components/ui/Badge';

export default function TokenRow({ token }: { token: Token }) {
  return (
    <div>
      <Link href={`/tokens/${token.id}`}>{token.id}</Link>
      <Badge status={token.status} />
    </div>
  );
}
