
const { app, BrowserWindow } = require("electron");
const path = require("path");

require("./ipc/customers.ipc");
require("./ipc/vehicles.ipc");
require("./ipc/services.ipc");
require("./ipc/inventory.ipc");
require("./ipc/appointments.ipc");
require("./ipc/workorders.ipc");
require("./ipc/invoices.ipc");
require("./ipc/storage.ipc");
require("./ipc/suppliers.ipc");
require("./ipc/auth.ipc");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    show: false,
    backgroundColor: "#0B0F13",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, "..", "dist", "index.html"));

  win.once("ready-to-show", () => {
    win.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
