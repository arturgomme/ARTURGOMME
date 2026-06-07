
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopApi", {
  customers: {
    getAll: () => ipcRenderer.invoke("customers:getAll"),
    create: (payload) => ipcRenderer.invoke("customers:create", payload),
    update: (id, payload) => ipcRenderer.invoke("customers:update", id, payload),
    remove: (id) => ipcRenderer.invoke("customers:remove", id),
  },
  vehicles: {
    getAll: () => ipcRenderer.invoke("vehicles:getAll"),
    create: (payload) => ipcRenderer.invoke("vehicles:create", payload),
    update: (id, payload) => ipcRenderer.invoke("vehicles:update", id, payload),
    remove: (id) => ipcRenderer.invoke("vehicles:remove", id),
  },
  services: {
    getAll: () => ipcRenderer.invoke("services:getAll"),
    create: (payload) => ipcRenderer.invoke("services:create", payload),
    update: (id, payload) => ipcRenderer.invoke("services:update", id, payload),
    remove: (id) => ipcRenderer.invoke("services:remove", id),
  }
});
