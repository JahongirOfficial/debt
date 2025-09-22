const { contextBridge, ipcRenderer } = require('electron');

// Frontend va Electron o'rtasida xavfsiz muloqot uchun API
contextBridge.exposeInMainWorld('electronAPI', {
  getBackendPort: () => ipcRenderer.invoke('get-backend-port')
});