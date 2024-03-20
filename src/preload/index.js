const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getCurrentNotebook: () => ipcRenderer.invoke("getCurrentNotebook"),
  listNotebooks: () => ipcRenderer.invoke("listNotebooks"),
  listFolders: (currentNotebook) => ipcRenderer.invoke("listFolders", currentNotebook),
  listFiles: (dir) => ipcRenderer.invoke("listFiles", dir),
  getFile: (path) => ipcRenderer.invoke("getFile", path),
  saveFile: (path, text) => ipcRenderer.invoke("saveFile", path, text),
  createNote: (path) => ipcRenderer.invoke("createNote", path)
});
