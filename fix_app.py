
from pathlib import Path
import re

CANDIDATES = [
    Path("frontend/src/App.jsx"),
    Path("App.jsx"),
]

target = None
for p in CANDIDATES:
    if p.exists():
        target = p
        break

if target is None:
    raise SystemExit("App.jsx non trovato")

text = target.read_text(encoding="utf-8")

# =========================
# 1) rimuovi pagina Deposito dal menu
# =========================
text = text.replace('  { key: "storage", label: "Deposito" },\n', "")

# =========================
# 2) aggiorna Deposito Gomme
# =========================
old_tire_deposits = """  tireDeposits: {
    label: "Deposito Gomme",
    fields: [
      { key: "customer_id", label: "Cliente", type: "select", source: "customers", optionLabel: "name", required: true },
      { key: "vehicle_id", label: "Veicolo", type: "select", source: "vehicles", optionLabel: "targa" },
      { key: "tire_id", label: "Pneumatico", type: "select", source: "tires", optionLabel: "brand" },
      { key: "quantity", label: "Quantità", type: "number", required: true },
      { key: "position", label: "Posizione", type: "text" },
      { key: "note", label: "Nota", type: "text" }
    ]
  }"""

new_tire_deposits = """  tireDeposits: {
    label: "Deposito Gomme",
    fields: [
      { key: "customer_id", label: "Cliente", type: "select", source: "customers", optionLabel: "name", required: true },
      { key: "vehicle_id", label: "Veicolo", type: "select", source: "vehicles", optionLabel: "targa" },
      { key: "tire_id", label: "Pneumatico", type: "select", source: "tires", optionLabel: "brand" },
      { key: "deposit_type", label: "Tipo deposito", type: "static-select", options: ["Solo gomme", "Gomme + cerchi"], required: true },
      { key: "quantity", label: "Quantità", type: "number", required: true },
      { key: "tread_front_mm", label: "Battistrada ant. (mm)", type: "number" },
      { key: "tread_rear_mm", label: "Battistrada post. (mm)", type: "number" },
      { key: "position", label: "Posizione", type: "text" },
      { key: "note", label: "Nota", type: "text" }
    ]
  }"""

if old_tire_deposits in text:
    text = text.replace(old_tire_deposits, new_tire_deposits)

# =========================
# 3) etichette prezzi con €
# =========================
text = text.replace(
    '{ key: "price", label: "Prezzo", type: "number" }',
    '{ key: "price", label: "Prezzo (€)", type: "number" }',
)
text = text.replace(
    '{ key: "total", label: "Totale", type: "number", required: true }',
    '{ key: "total", label: "Totale (€)", type: "number", required: true }',
)

# =========================
# 4) Nome e cognome: iniziali maiuscole
# =========================
text = re.sub(
    r'function sentenceCase\(input\) \{.*?\n\}',
    '''function sentenceCase(input) {
  const text = String(input ?? "").trim();
  if (!text) return "";
  return text
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}''',
    text,
    count=1,
    flags=re.S,
)

# =========================
# 5) dopo salvataggio torna in dashboard
# =========================
text = text.replace(
    '''      await window.api[entityKey].create(normalizePayload(config, forms[entityKey]));
      setStatus(`${config.label}: record creato ✅`);
      refreshAll();''',
    '''      await window.api[entityKey].create(normalizePayload(config, forms[entityKey]));
      setStatus(`${config.label}: record creato ✅`);
      setTab("dashboard");
      refreshAll();''',
)

text = text.replace(
    '''      await window.api[entityKey].update(rowId, normalizePayload(config, editingRows[entityKey][rowId]));
      setStatus(`${config.label}: record aggiornato ✅`);
      refreshAll();''',
    '''      await window.api[entityKey].update(rowId, normalizePayload(config, editingRows[entityKey][rowId]));
      setStatus(`${config.label}: record aggiornato ✅`);
      setTab("dashboard");
      refreshAll();''',
)

# =========================
# 6) prezzi sempre con euro
# =========================
text = text.replace(
    '''  function formatDisplayValue(field, value) {
    if (field.type === "checkbox") return value ? "SI" : "NO";
    if (field.type === "service-checklist") return formatServiceNames(value);''',
    '''  function formatDisplayValue(field, value) {
    if (field.type === "checkbox") return value ? "SI" : "NO";
    if (field.type === "service-checklist") return formatServiceNames(value);
    if (field.key === "price" || field.key === "total") {
      if (value === null || value === undefined || value === "") return "-";
      return `€ ${Number(value).toFixed(2)}`;
    }''',
)

# =========================
# 7) dashboard: togli card deposito + agenda di oggi
# =========================
old_dashboard = '''        {tab === "dashboard" && (
          <div style={panelStyle}>
            <h2 style={panelTitleStyle}>Dashboard</h2>
            <div style={dashboardGridStyle}>
              <div style={dashboardCardStyle}>Clienti: {db.customers.length}</div>
              <div style={dashboardCardStyle}>Veicoli: {db.vehicles.length}</div>
              <div style={dashboardCardStyle}>Servizi: {db.services.length}</div>
              <div style={dashboardCardStyle}>Magazzino: {db.inventory.length}</div>
              <div style={dashboardCardStyle}>Fornitori: {db.suppliers.length}</div>
              <div style={dashboardCardStyle}>Appuntamenti: {db.appointments.length}</div>
              <div style={dashboardCardStyle}>Schede lavoro: {db.workOrders.length}</div>
              <div style={dashboardCardStyle}>Fatture: {db.invoices.length}</div>
              <div style={dashboardCardStyle}>Deposito: {db.storage.length}</div>
              <div style={dashboardCardStyle}>Pneumatici: {db.tires.length}</div>
              <div style={dashboardCardStyle}>Deposito Gomme: {db.tireDeposits.length}</div>
              <div style={dashboardCardStyle}>
                Gomme scorta bassa: {(db.tires || []).filter((t) => Number(t.quantity || 0) <= LOW_STOCK_QTY).length}
              </div>
            </div>
          </div>
        )}'''

new_dashboard = '''        {tab === "dashboard" && (
          <div style={panelStyle}>
            <h2 style={panelTitleStyle}>Dashboard</h2>
            <div style={dashboardGridStyle}>
              <div style={dashboardCardStyle}>Clienti: {db.customers.length}</div>
              <div style={dashboardCardStyle}>Veicoli: {db.vehicles.length}</div>
              <div style={dashboardCardStyle}>Servizi: {db.services.length}</div>
              <div style={dashboardCardStyle}>Magazzino: {db.inventory.length}</div>
              <div style={dashboardCardStyle}>Fornitori: {db.suppliers.length}</div>
              <div style={dashboardCardStyle}>Appuntamenti: {db.appointments.length}</div>
              <div style={dashboardCardStyle}>Schede lavoro: {db.workOrders.length}</div>
              <div style={dashboardCardStyle}>Fatture: {db.invoices.length}</div>
              <div style={dashboardCardStyle}>Pneumatici: {db.tires.length}</div>
              <div style={dashboardCardStyle}>Deposito Gomme: {db.tireDeposits.length}</div>
              <div style={dashboardCardStyle}>
                Gomme scorta bassa: {(db.tires || []).filter((t) => Number(t.quantity || 0) <= LOW_STOCK_QTY).length}
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <h3 style={sectionTitleStyle}>Agenda di oggi</h3>
              {(db.appointments || [])
                .filter((a) => {
                  if (!a.scheduled_at) return false;
                  const d = new Date(a.scheduled_at);
                  const now = new Date();
                  return (
                    d.getDate() === now.getDate() &&
                    d.getMonth() === now.getMonth() &&
                    d.getFullYear() === now.getFullYear()
                  );
                })
                .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))
                .map((a) => (
                  <div key={a.id} style={dashboardAgendaItemStyle}>
                    <strong>{new Date(a.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</strong>
                    <span>
                      {a.customer_id ? `${refs.customersById[a.customer_id]?.name || "-"}` : "-"}
                      {a.vehicle_id ? ` • ${refs.vehiclesById[a.vehicle_id]?.targa || "-"}` : ""}
                      {a.note ? ` • ${a.note}` : ""}
                    </span>
                  </div>
                ))}
              {(db.appointments || []).filter((a) => {
                if (!a.scheduled_at) return false;
                const d = new Date(a.scheduled_at);
                const now = new Date();
                return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              }).length === 0 && <div style={historyEmptyStyle}>Nessun appuntamento oggi</div>}
            </div>
          </div>
        )}'''

if old_dashboard in text:
    text = text.replace(old_dashboard, new_dashboard)

# =========================
# 8) sidebar fissa + content con margine
# =========================
old_sidebar = '''const sidebarStyle = {
  position: "sticky",
  top: 0,
  height: "100vh",
  width: 250,
  minWidth: 250,
  background: "#0F151D",
  borderRight: "1px solid #1F2A36",
  padding: 18,
  boxSizing: "border-box",
  alignSelf: "flex-start",
  overflowY: "auto"
};'''

new_sidebar = '''const sidebarStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  height: "100vh",
  width: 250,
  minWidth: 250,
  background: "#0F151D",
  borderRight: "1px solid #1F2A36",
  padding: 18,
  boxSizing: "border-box",
  overflowY: "auto",
  zIndex: 10
};'''

text = text.replace(old_sidebar, new_sidebar)

old_content = '''const contentStyle = {
  flex: 1,
  padding: 20,
  minWidth: 0
};'''

new_content = '''const contentStyle = {
  flex: 1,
  padding: 20,
  minWidth: 0,
  marginLeft: 250,
  overflowX: "auto"
};'''

text = text.replace(old_content, new_content)

# =========================
# 9) cronologia deposito gomme migliorata
# =========================
text = text.replace(
    '''                  text: `Q.tà ${Number(d.quantity || 0)}${d.position ? ` • ${normalizeTextValue("position", d.position)}` : ""}${d.note ? ` • ${normalizeTextValue("note", d.note)}` : ""}`''',
    '''                  text: `${normalizeTextValue("deposit_type", d.deposit_type) || "-"} • Q.tà ${Number(d.quantity || 0)}${d.tread_front_mm ? ` • Ant ${d.tread_front_mm} mm` : ""}${d.tread_rear_mm ? ` • Post ${d.tread_rear_mm} mm` : ""}${d.position ? ` • ${normalizeTextValue("position", d.position)}` : ""}${d.note ? ` • ${normalizeTextValue("note", d.note)}` : ""}`''',
)

# =========================
# 10) stile agenda oggi
# =========================
if 'const dashboardAgendaItemStyle = {' not in text:
    text += '''

const dashboardAgendaItemStyle = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  padding: "8px 10px",
  borderRadius: 8,
  background: "#0B0F13",
  border: "1px solid #1F2A36",
  marginBottom: 8,
  flexWrap: "wrap"
};
'''

# =========================
# 11) salva
# =========================
target.write_text(text, encoding="utf-8")
print(f"OK: aggiornato {target}")
