const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron/renderer')


// Exponer en JS del Cliente
contextBridge.exposeInMainWorld('electronAPI', {
    goTo: (page) => ipcRenderer.send('goTo', page),
    hermanosDB: async () => await ipcRenderer.invoke('hermanosDB')
})