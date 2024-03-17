const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getCurrentNotebook: () => ipcRenderer.invoke("getCurrentNotebook"),
  listNotebooks: () => ipcRenderer.invoke("listNotebooks")
});
