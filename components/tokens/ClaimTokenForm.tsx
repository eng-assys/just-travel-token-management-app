'use client';

import { useState } from 'react';
import { claimToken } from '@/services/tokens.service';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ClaimTokenForm() {
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>();

  async function handleSubmit() {
    try {
      setError(undefined);
      const data = await claimToken(userId);
      setResult(data);
    } catch {
      setError('Erro ao solicitar token');
    }
  }

  return (
    <div>
      <h2>Requisitar Token</h2>

      <Input
        placeholder="User ID (UUID)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <Button onClick={handleSubmit}>Solicitar Token</Button>

      {error && <p>{error}</p>}
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
