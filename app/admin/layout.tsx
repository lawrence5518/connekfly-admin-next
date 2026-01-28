export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: "black", color: "white" }}>
        {children}
      </body>
    </html>
  );
}
