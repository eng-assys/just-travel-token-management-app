export default function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
      }}
    >
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      {children}
    </section>
  );
}
