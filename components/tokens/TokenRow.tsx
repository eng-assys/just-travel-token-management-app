'use client';

import Button from '@/components/ui/Button';
import type { Token } from '@/types/token';
import Badge from '../ui/Badge';

export default function TokenRow({
  token,
  onOpenDetails,
}: {
  token: Token;
  onOpenDetails: () => void;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
      <div>
        <span>{token.id}</span>
        <Badge status={token.status} />
      </div>

      <Button onClick={onOpenDetails}>Detalhes</Button>
    </div>
  );
}
