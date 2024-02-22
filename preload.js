const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron/renderer')


// Exponer en JS del Cliente
contextBridge.exposeInMainWorld('electronAPI', {
    goTo: (page) => ipcRenderer.send('goTo', page),
    getAllhermanosDB: async () => await ipcRenderer.invoke('getAllhermanosDB'),
    newHermano: (data) => ipcRenderer.invoke('newHermano', data),
    deleteHermano: (id) => ipcRenderer.invoke('deleteHermano', id)
})