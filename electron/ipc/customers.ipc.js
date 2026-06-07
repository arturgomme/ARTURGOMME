
const { ipcMain } = require("electron");
const customers = require("../../backend/services/customers.service");

ipcMain.handle("customers:getAll", async () => {
  return customers.getAllCustomers();
});

ipcMain.handle("customers:create", async (_, payload) => {
  return customers.createCustomer(payload);
});

ipcMain.handle("customers:update", async (_, id, payload) => {
  return customers.updateCustomer(id, payload);
});

ipcMain.handle("customers:remove", async (_, id) => {
  return customers.removeCustomer(id);
});
