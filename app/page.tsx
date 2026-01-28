export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>ConnekFly Admin</h1>
      <p>Panel de administración operativo.</p>

      <ul>
        <li>
          <a href="/admin">Ir al Admin</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </main>
  );
}
