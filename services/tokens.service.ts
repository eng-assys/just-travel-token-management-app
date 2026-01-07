const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function claimToken(userId: string) {
  const res = await fetch(`${API_URL}/tokens/claim`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    throw new Error('Erro ao solicitar token');
  }

  return res.json();
}

export async function listTokens(status?: string) {
  const query = status ? `?status=${status}` : '';
  const res = await fetch(`${API_URL}/tokens${query}`);
  return res.json();
}

export async function getTokenById(tokenId: string) {
  const res = await fetch(`${API_URL}/tokens/${tokenId}`);
  return res.json();
}

export async function getTokenHistory(tokenId: string) {
  const res = await fetch(`${API_URL}/tokens/${tokenId}/history`);
  return res.json();
}

export async function clearActiveTokens() {
  const res = await fetch(`${API_URL}/tokens/clear-active`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Erro ao limpar tokens ativos');
  }
}
