
import { useEffect, useMemo, useState } from "react";
import { desktopApi } from "../desktopApi";

export function useWorkshopStore() {
  const [db, setDb] = useState({
    customers: [],
    vehicles: [],
    services: [],
    inventory: [],
    appointments: [],
    workOrders: [],
    invoices: [],
    suppliers: [],
    storageItems: [],
    settings: {
      businessName: "ARTUR GOMME"
    }
  });

  const loadAll = async () => {
    const [customers, vehicles, services] = await Promise.all([
      desktopApi.customers.getAll(),
      desktopApi.vehicles.getAll(),
      desktopApi.services.getAll(),
    ]);

    setDb((s) => ({
      ...s,
      customers,
      vehicles,
      services,
    }));
  };

  useEffect(() => {
    loadAll();
  }, []);

  const actions = {
    saveCustomer: async (payload) => {
      if (payload.id) {
        await desktopApi.customers.update(payload.id, payload);
      } else {
        await desktopApi.customers.create(payload);
      }
      await loadAll();
    },
    deleteCustomer: async (id) => {
      await desktopApi.customers.remove(id);
      await loadAll();
    },
  };

  const maps = useMemo(() => ({
    customersById: Object.fromEntries(db.customers.map((c) => [c.id, c])),
    vehiclesById: Object.fromEntries(db.vehicles.map((v) => [v.id, v])),
  }), [db]);

  return { db, maps, actions };
}
