export default function Badge({ label }: { label: string }) {
  return (
    <span style={{ padding: 4, border: '1px solid #ccc' }}>
      {label}
    </span>
  );
}
