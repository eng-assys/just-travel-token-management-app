import { TokenHistoryItem } from '@/types/token';
import { formatDate } from '@/utils/formatDate';
import Card from '../ui/Card';

interface TokenHistoryProps {
  history: TokenHistoryItem[];
}

export default function TokenHistory({ history }: TokenHistoryProps) {
  if (!history || history.length === 0) {
    return (
      <Card title="Histórico do Token">
        <p>Nenhum histórico encontrado.</p>
      </Card>
    );
  }

  return (
      <Card title="Histórico do Token">
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: 12,
          }}
        >
          <thead>
            <tr>
              <th align="left">User ID</th>
              <th align="left">Ativado em</th>
              <th align="left">Liberado em</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.userId}</td>
                <td>{formatDate(item.activatedAt)}</td>
                <td>{formatDate(item.releasedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
  );
}
