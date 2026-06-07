
export const resourceConfig = {
  customers: {
    label: "Clienti",
    fields: [
      { key: "name", label: "Nome", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Telefono", type: "text" }
    ]
  },
  vehicles: {
    label: "Veicoli",
    fields: [
      { key: "customer_id", label: "Cliente", type: "select", source: "customers", optionLabel: "name" },
      { key: "targa", label: "Targa", type: "text" },
      { key: "marca", label: "Marca", type: "text" },
      { key: "modello", label: "Modello", type: "text" }
    ]
  },
  services: {
    label: "Servizi",
    fields: [
      { key: "name", label: "Nome servizio", type: "text" },
      { key: "price", label: "Prezzo", type: "number" },
      { key: "duration_min", label: "Durata (min)", type: "number" }
    ]
  },
  inventory: {
    label: "Magazzino",
    fields: [
      { key: "name", label: "Articolo", type: "text" },
      { key: "quantity", label: "Quantità", type: "number" },
      { key: "price", label: "Prezzo", type: "number" }
    ]
  },
  suppliers: {
    label: "Fornitori",
    fields: [
      { key: "name", label: "Nome", type: "text" },
      { key: "phone", label: "Telefono", type: "text" },
      { key: "email", label: "Email", type: "text" }
    ]
  },
  appointments: {
    label: "Appuntamenti",
    fields: [
      { key: "customer_id", label: "Cliente", type: "select", source: "customers", optionLabel: "name" },
      { key: "vehicle_id", label: "Veicolo", type: "select", source: "vehicles", optionLabel: "targa" },
      { key: "scheduled_at", label: "Data", type: "datetime-local" },
      { key: "note", label: "Nota", type: "text" }
    ]
  },
  workOrders: {
    label: "Ordini lavoro",
    fields: [
      { key: "customer_id", label: "Cliente", type: "select", source: "customers", optionLabel: "name" },
      { key: "vehicle_id", label: "Veicolo", type: "select", source: "vehicles", optionLabel: "targa" },
      { key: "description", label: "Descrizione", type: "text" },
      { key: "status", label: "Stato", type: "text" }
    ]
  },
  invoices: {
    label: "Fatture",
    fields: [
      { key: "work_order_id", label: "Ordine lavoro", type: "select", source: "workOrders", optionLabel: "description" },
      { key: "total", label: "Totale", type: "number" },
      { key: "paid", label: "Pagata", type: "checkbox" }
    ]
  },
  storage: {
    label: "Deposito",
    fields: [
      { key: "customer_id", label: "Cliente", type: "select", source: "customers", optionLabel: "name" },
      { key: "vehicle_id", label: "Veicolo", type: "select", source: "vehicles", optionLabel: "targa" },
      { key: "note", label: "Nota deposito", type: "text" }
    ]
  }
};
