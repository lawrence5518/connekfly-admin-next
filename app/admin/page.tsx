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
  // USO POR MÓDULO (B2)
  // ─────────────────────────────

  const { data: usoModulos } = await supabase
    .from("lia_eventos")
    .select("module")
    .gte(
      "created_at",
      new Date().toISOString().split("T")[0]
    );

  const modulos = {
    chat: 0,
    connektik: 0,
    crm: 0,
    wall: 0,
    marketplace: 0,
  };

  usoModulos?.forEach(e => {
    const m = e.module?.toLowerCase();
    if (m && m in modulos) {
      modulos[m as keyof typeof modulos]++;
    }
  });

  // ─────────────────────────────
  // LIA ALERTAS (B3 REAL)
  // ─────────────────────────────

  const { data: alertas } = await supabase
    .from("crm_alerts_readonly")
    .select("module, score, alert_icon, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

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
          <li><strong>Activos ahora:</strong> {activosAhora ?? 0}</li>
          <li><strong>Activos hoy:</strong> {activosHoy ?? 0}</li>
        </ul>
      </section>

      {/* USO POR MÓDULO */}
      <section style={{ marginBottom: 32 }}>
        <h2>📊 Uso por módulo (hoy)</h2>
        <ol>
          <li>Chat — {modulos.chat}</li>
          <li>ConnekTik — {modulos.connektik}</li>
          <li>CRM — {modulos.crm}</li>
          <li>Muro — {modulos.wall}</li>
          <li>Marketplace — {modulos.marketplace}</li>
        </ol>
      </section>

      {/* LIA */}
      <section style={{ marginBottom: 32 }}>
        <h2>🧠 LIA — Alertas recientes</h2>

        {alertas && alertas.length > 0 ? (
          <ul>
            {alertas.map((a, i) => (
              <li key={i}>
                {a.alert_icon}{" "}
                <strong>{a.module}</strong>{" "}
                — score {a.score}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#999" }}>
            Sin alertas recientes
          </p>
        )}
      </section>

      {/* ATENCIÓN */}
      <section>
        <h2>🧯 Atención del creador</h2>
        <ul>
          <li>🔧 Ajustes sugeridos por LIA (siguiente paso)</li>
        </ul>
      </section>
    </main>
  );
}
