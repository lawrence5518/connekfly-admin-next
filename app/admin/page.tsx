export default function AdminDashboard() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        ConnekFly — Panel de Control
      </h1>

      <p style={{ color: "#666", marginBottom: 32 }}>
        Estado general del sistema
      </p>

      {/* USUARIOS */}
      <section style={{ marginBottom: 32 }}>
        <h2>👥 Usuarios</h2>
        <ul>
          <li><strong>Activos ahora:</strong> 127</li>
          <li><strong>Activos hoy:</strong> 1,842</li>
          <li><strong>Tendencia 24h:</strong> ▲ +6.3%</li>
        </ul>
      </section>

      {/* USO POR MÓDULO */}
      <section style={{ marginBottom: 32 }}>
        <h2>📊 Uso por módulo (hoy)</h2>
        <ol>
          <li>Chat — 41%</li>
          <li>ConnekTik — 27%</li>
          <li>CRM — 18%</li>
          <li>Muro — 9%</li>
          <li>Marketplace — 5%</li>
        </ol>
      </section>

      {/* LIA */}
      <section style={{ marginBottom: 32 }}>
        <h2>🧠 LIA — Observaciones</h2>
        <ul>
          <li>🔥 Muchos usuarios free alcanzando límite de CRM</li>
          <li>⚠️ Crecimiento inusual en ConnekTik hoy</li>
          <li>ℹ️ Marketplace estable</li>
        </ul>
      </section>

      {/* ATENCIÓN */}
      <section>
        <h2>🧯 Atención del creador</h2>
        <ul>
          <li>🔧 Ajuste recomendado en límites CRM</li>
          <li>💤 Módulo Ubicación con bajo uso (7 días)</li>
        </ul>
      </section>
    </main>
  );
}
