
import { useEffect, useState } from "react";
import { getCustomers, createCustomer } from "../api";

export function useWorkshopStore() {
  const [customers, setCustomers] = useState([]);

  const load = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const addCustomer = async (c) => {
    await createCustomer(c);
    await load();
  };

  useEffect(() => {
    load();
  }, []);

  return {
    db: { customers },
    actions: { addCustomer },
  };
}
