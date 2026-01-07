import { TokenStatus } from '@/types/token';

interface BadgeProps {
  status: TokenStatus;
}

export default function Badge({ status }: BadgeProps) {
  const isActive = status === 'ACTIVE';

  return (
    <span
      style={{
        padding: '4px 8px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: isActive ? '#ffe5e5' : '#e6f7ec',
        color: isActive ? '#b00020' : '#1b7f4d',
        border: `1px solid ${isActive ? '#b00020' : '#1b7f4d'}`,
        marginLeft: 8,
      }}
    >
      {isActive ? 'Ativo' : 'Disponível'}
    </span>
  );
}
