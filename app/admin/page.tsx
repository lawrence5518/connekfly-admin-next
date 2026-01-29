import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function AdminDashboard() {
  // ─────────────────────────────
  // USUARIOS
  // ─────────────────────────────

  const { count: activosAhora } = await supabase
    .from("lia_eventos")
    .select("user_id", { count: "exact", head: true })
    .gte(
      "created_at",
      new Date(Date.now() - 10 * 60 * 1000).toISOString()
    );

  const { count: activosHoy } = await supabase
    .from("lia_eventos")
    .select("user_id", { count: "exact", head: true })
    .gte(
      "created_at",
      new Date().toISOString().split("T")[0]
    );

  // ─────────────────────────────
  // LIA ALERTAS
  // ─────────────────────────────

  const { data: alertas } = await supabase
    .from("crm_alerts_readonly")
    .select("score");

  const alertasAlta =
    alertas?.filter(a => a.score >= 80).length ?? 0;
  const alertasMedia =
    alertas?.filter(a => a.score >= 50 && a.score < 80).length ?? 0;
  const alertasInfo =
    alertas?.filter(a => a.score < 50).length ?? 0;

  return (
    <main style={{ padding: 32, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        ConnekFly — Panel de Control
      </h1>

      <p style={{ color: "#666", marginBottom: 32 }}>
        Estado general del sistema
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2>👥 Usuarios</h2>
        <ul>
          <li><strong>Activos ahora:</strong> {activosAhora ?? 0}</li>
          <li><strong>Activos hoy:</strong> {activosHoy ?? 0}</li>
          <li><strong>Tendencia 24h:</strong> — calculando</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>📊 Uso por módulo (hoy)</h2>
        <ol>
          <li>Chat — pendiente</li>
          <li>ConnekTik — pendiente</li>
          <li>CRM — pendiente</li>
          <li>Muro — pendiente</li>
          <li>Marketplace — pendiente</li>
        </ol>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>🧠 LIA — Observaciones</h2>
        <ul>
          <li>🔥 Alertas altas: {alertasAlta}</li>
          <li>⚠️ Alertas medias: {alertasMedia}</li>
          <li>ℹ️ Informativas: {alertasInfo}</li>
        </ul>
      </section>

      <section>
        <h2>🧯 Atención del creador</h2>
        <ul>
          <li>🔧 Ajustes sugeridos por LIA (próximo)</li>
          <li>💤 Módulos con bajo uso (próximo)</li>
        </ul>
      </section>
    </main>
  );
}
