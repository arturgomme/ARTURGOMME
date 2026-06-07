
import { useEffect, useState } from "react";
import Layout from "./components/Layout.jsx";
import CrudPage from "./components/CrudPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { resourceConfig } from "./resources.js";

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [db, setDb] = useState({
    customers: [],
    vehicles: [],
    services: [],
    inventory: [],
    suppliers: [],
    appointments: [],
    workOrders: [],
    invoices: [],
    storage: []
  });

  const loadAll = async () => {
    const [
      customers,
      vehicles,
      services,
      inventory,
      suppliers,
      appointments,
      workOrders,
      invoices,
      storage
    ] = await Promise.all([
      window.api.customers.getAll(),
      window.api.vehicles.getAll(),
      window.api.services.getAll(),
      window.api.inventory.getAll(),
      window.api.suppliers.getAll(),
      window.api.appointments.getAll(),
      window.api.workOrders.getAll(),
      window.api.invoices.getAll(),
      window.api.storage.getAll()
    ]);

    setDb({
      customers,
      vehicles,
      services,
      inventory,
      suppliers,
      appointments,
      workOrders,
      invoices,
      storage
    });
  };

  useEffect(() => {
    loadAll();
  }, []);

  const apiMap = {
    customers: window.api.customers,
    vehicles: window.api.vehicles,
    services: window.api.services,
    inventory: window.api.inventory,
    suppliers: window.api.suppliers,
    appointments: window.api.appointments,
    workOrders: window.api.workOrders,
    invoices: window.api.invoices,
    storage: window.api.storage
  };

  const actions = {
    async create(entity, payload) {
      await apiMap[entity].create(payload);
      await loadAll();
    },
    async remove(entity, id) {
      await apiMap[entity].remove(id);
      await loadAll();
    }
  };

  let content = null;

  if (tab === "dashboard") content = <DashboardPage db={db} />;
  else if (tab === "settings") {
    content = (
      <div className="panel">
        <div className="section-title"><h2>Impostazioni</h2></div>
        <p className="muted">Configura il database nel file <code>.env</code> della root.</p>
      </div>
    );
  } else {
    content = (
      <CrudPage
        entityKey={tab}
        db={db}
        actions={actions}
        config={resourceConfig[tab]}
      />
    );
  }

  return (
    <Layout tab={tab} setTab={setTab}>
      {content}
    </Layout>
  );
}
