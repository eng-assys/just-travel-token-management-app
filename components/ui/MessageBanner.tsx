'use client';

export default function Message({
  text,
  isError,
}: {
  text: string;
  isError?: boolean;
}) {
  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: 6,
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: isError ? '#fdecea' : '#e6f4ea',
        color: isError ? '#b42318' : '#1e7f4d',
        border: `1px solid ${isError ? '#f5c2c0' : '#b7e1cd'}`,
      }}
    >
      {text}
    </div>
  );
}
