import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function AdminUsersPage() {
  const { data: usuarios } = await supabase
    .from("profiles")
    .select(`
      id,
      email,
      display_name,
      created_at,
      lia_user_status (
        plan_name,
        is_premium_active,
        is_free_active
      )
    `)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <main style={{ padding: 32, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>
        👤 Usuarios — ConnekFly
      </h1>

      <p style={{ color: "#666", marginBottom: 32 }}>
        Últimos usuarios registrados (solo lectura)
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
        }}
      >
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
            <th>Usuario</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Estado</th>
            <th>Registro</th>
          </tr>
        </thead>

        <tbody>
          {usuarios?.map((u) => {
            // 🔑 NORMALIZACIÓN CORRECTA (Supabase devuelve arrays)
            const status = Array.isArray(u.lia_user_status)
              ? u.lia_user_status[0]
              : null;

            const plan = status?.plan_name ?? "—";

            const estado = status?.is_premium_active
              ? "🟣 Premium"
              : status?.is_free_active
              ? "🟢 Free"
              : "⚪ Sin plan";

            return (
              <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
                <td>{u.display_name ?? "—"}</td>
                <td>{u.email}</td>
                <td>{plan}</td>
                <td>{estado}</td>
                <td>
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
