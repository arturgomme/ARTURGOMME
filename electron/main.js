
const { app, BrowserWindow } = require("electron");
const path = require("path");
const { registerAll } = require("./registers");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    show: false,
    backgroundColor: "#0B0F13",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.loadFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));

  win.once("ready-to-show", () => {
    win.show();
  });
}

app.whenReady().then(() => {
  registerAll();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
