import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gerenciamento de Tokens',
  description: 'Sistema de Gerenciamento de Tokens - Just Travel challenge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f5f5f5',
        }}
      >
        <header
          style={{
            padding: '16px 24px',
            backgroundColor: '#111',
            color: '#fff',
          }}
        >
          <strong>Gerenciamento de Tokens</strong>
        </header>

        <main
          style={{
            padding: 24,
            maxWidth: 900,
            margin: '0 auto',
            backgroundColor: '#fff',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
