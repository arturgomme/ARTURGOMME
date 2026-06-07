
const items = [
  ["dashboard", "Dashboard"],
  ["customers", "Clienti"],
  ["vehicles", "Veicoli"],
  ["services", "Servizi"],
  ["inventory", "Magazzino"],
  ["suppliers", "Fornitori"],
  ["appointments", "Appuntamenti"],
  ["workOrders", "Ordini lavoro"],
  ["invoices", "Fatture"],
  ["storage", "Deposito"],
  ["settings", "Impostazioni"]
];

export default function Layout({ tab, setTab, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">ARTUR GOMME</div>
        <div className="subtitle">Gestionale officina desktop</div>

        {items.map(([key, label]) => (
          <button
            key={key}
            className={`nav-btn ${tab === key ? "active" : ""}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </aside>

      <main className="main">{children}</main>
    </div>
  );
}
