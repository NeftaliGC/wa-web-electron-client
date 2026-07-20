const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("waSidebarBridge", {
    requestToggle: () => ipcRenderer.send("sidebar:toggle")
});