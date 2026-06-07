
import React, { useState } from "react";
import { useWorkshopStore } from "./hooks/useWorkshopStore";
import CustomersPage from "./pages/CustomersPage";

export default function App() {
  const store = useWorkshopStore();

  return (
    <div style={{ background: "#0B0F13", color: "white", minHeight: "100vh", padding: 20 }}>
      <h1 style={{ color: "#00F0C8" }}>ARTUR GOMME</h1>

      <CustomersPage db={store.db} actions={store.actions} />
    </div>
  );
}
