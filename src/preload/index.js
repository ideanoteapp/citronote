const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getLocales: () => ipcRenderer.invoke("getLocales"),
  getCurrentNotebook: () => ipcRenderer.invoke("getCurrentNotebook"),
  setCurrentNotebook: (notebook) => ipcRenderer.invoke("setCurrentNotebook", notebook),
  addNotebook: () => ipcRenderer.invoke("addNotebook"),
  removeNotebook: (currentNotebook) => ipcRenderer.invoke("removeNotebook", currentNotebook),
  listNotebooks: () => ipcRenderer.invoke("listNotebooks"),
  listFolders: (currentNotebook) => ipcRenderer.invoke("listFolders", currentNotebook),
  listFiles: (dir) => ipcRenderer.invoke("listFiles", dir),
  getFile: (path) => ipcRenderer.invoke("getFile", path),
  saveFile: (path, text) => ipcRenderer.invoke("saveFile", path, text),
  createNote: (path) => ipcRenderer.invoke("createNote", path),
  changeNoteTitle: (from, to) => ipcRenderer.invoke("changeNoteTitle", from, to),
  deleteNote: (path) => ipcRenderer.invoke("deleteNote", path),
  getPreferences: (path) => ipcRenderer.invoke("getPreferences", path),
  setPreferences: (path, data) => ipcRenderer.invoke("setPreferences", path, data),
  rightClick: () => ipcRenderer.invoke("rightClick"),
  getIfUpdated: () => ipcRenderer.invoke("getIfUpdated"),
  upload: (currentFolder, file) => ipcRenderer.invoke("upload", currentFolder, file)
});
