
const { contextBridge, ipcRenderer } = require("electron");

function buildApi(channel) {
  return {
    getAll: () => ipcRenderer.invoke(`${channel}:getAll`),
    create: (payload) => ipcRenderer.invoke(`${channel}:create`, payload),
    update: (id, payload) => ipcRenderer.invoke(`${channel}:update`, id, payload),
    remove: (id) => ipcRenderer.invoke(`${channel}:remove`, id)
  };
}

contextBridge.exposeInMainWorld("api", {
  customers: buildApi("customers"),
  vehicles: buildApi("vehicles"),
  services: buildApi("services"),
  inventory: buildApi("inventory"),
  suppliers: buildApi("suppliers"),
  appointments: buildApi("appointments"),
  workOrders: buildApi("workOrders"),
  invoices: buildApi("invoices"),
  storage: buildApi("storage")
});
