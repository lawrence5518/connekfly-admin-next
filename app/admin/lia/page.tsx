export default function LiaAdminPage() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        🧠 LIA — Observaciones del Sistema
      </h1>

      <p style={{ color: "#666", marginBottom: 32 }}>
        LIA observa, analiza y te informa. No actúa automáticamente.
      </p>

      {/* ALERTA ALTA */}
      <section style={{ marginBottom: 24 }}>
        <h3>🔥 Alta prioridad</h3>
        <p>
          Muchos usuarios <strong>free</strong> alcanzaron el límite de CRM hoy.
        </p>
        <small style={{ color: "#999" }}>
          Módulo: CRM · hace 12 minutos
        </small>
      </section>

      {/* ALERTA MEDIA */}
      <section style={{ marginBottom: 24 }}>
        <h3>⚠️ Prioridad media</h3>
        <p>
          ConnekTik muestra un crecimiento inusual del <strong>+38%</strong>.
        </p>
        <small style={{ color: "#999" }}>
          Módulo: ConnekTik · hoy
        </small>
      </section>

      {/* INFO */}
      <section style={{ marginBottom: 24 }}>
        <h3>ℹ️ Información</h3>
        <p>Marketplace estable, sin anomalías detectadas.</p>
        <small style={{ color: "#999" }}>
          Módulo: Marketplace · hoy
        </small>
      </section>
    </main>
  );
}
