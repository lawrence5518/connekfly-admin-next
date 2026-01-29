import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function AdminCrmContactPage({
  params,
}: {
  params: { id: string };
}) {
  // ─────────────────────────────
  // CONTACTO
  // ─────────────────────────────

  const { data: contacto } = await supabase
    .from("crm_contacts")
    .select("*")
    .eq("id", params.id)
    .single();

  // ─────────────────────────────
  // ALERTAS LIA
  // ─────────────────────────────

  const { data: alertas } = await supabase
    .from("crm_alerts_readonly")
    .select("*")
    .eq("entity_id", params.id)
    .order("created_at", { ascending: false });

  if (!contacto) {
    return (
      <main style={{ padding: 32 }}>
        <h1>Contacto no encontrado</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: 32, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 26, marginBottom: 4 }}>
        {contacto.name}
      </h1>

      <p style={{ color: "#666", marginBottom: 24 }}>
        Lead CRM — Vista detallada (solo lectura)
      </p>

      {/* DATOS */}
      <section style={{ marginBottom: 32 }}>
        <h2>📇 Datos del contacto</h2>
        <ul>
          <li><strong>Email:</strong> {contacto.email ?? "—"}</li>
          <li><strong>Teléfono:</strong> {contacto.phone ?? "—"}</li>
          <li><strong>Empresa:</strong> {contacto.company ?? "—"}</li>
          <li><strong>Estado:</strong> {contacto.status}</li>
          <li><strong>Score:</strong> {contacto.score}</li>
          <li>
            <strong>Prob. cierre:</strong>{" "}
            {contacto.close_probability}%
          </li>
          <li>
            <strong>Última interacción:</strong>{" "}
            {contacto.last_interaction
              ? new Date(contacto.last_interaction).toLocaleString()
              : "—"}
          </li>
        </ul>
      </section>

      {/* LIA */}
      <section>
        <h2>🧠 LIA — Observaciones</h2>

        {alertas && alertas.length > 0 ? (
          <ul>
            {alertas.map((a) => (
              <li key={a.id}>
                {a.alert_icon} {a.from_label} → {a.to_label} (score {a.score})
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#777" }}>
            Sin observaciones relevantes por ahora.
          </p>
        )}
      </section>
    </main>
  );
}
