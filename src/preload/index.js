const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getCurrentNotebook: () => ipcRenderer.invoke("getCurrentNotebook"),
  listNotebooks: () => ipcRenderer.invoke("listNotebooks"),
  listFolders: (currentNotebook) => ipcRenderer.invoke("listFolders", currentNotebook),
  listFiles: (dir) => ipcRenderer.invoke("listFiles", dir)
});
