
export default function DashboardPage({ db }) {
  return (
    <div className="panel">
      <div className="section-title">
        <h2>Dashboard</h2>
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="card-title">Clienti</div>
          <div className="card-value">{db.customers.length}</div>
        </div>

        <div className="card">
          <div className="card-title">Veicoli</div>
          <div className="card-value">{db.vehicles.length}</div>
        </div>

        <div className="card">
          <div className="card-title">Servizi</div>
          <div className="card-value">{db.services.length}</div>
        </div>

        <div className="card">
          <div className="card-title">Magazzino</div>
          <div className="card-value">{db.inventory.length}</div>
        </div>

        <div className="card">
          <div className="card-title">Ordini lavoro</div>
          <div className="card-value">{db.workOrders.length}</div>
        </div>

        <div className="card">
          <div className="card-title">Fatture</div>
          <div className="card-value">{db.invoices.length}</div>
        </div>
      </div>
    </div>
  );
}
