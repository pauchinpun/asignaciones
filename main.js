const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { initHermanosDatabase, getAllHermanos, insertHermanoData } = require(path.join(__dirname, 'database/hermanos.js'));

let mainWin;

const createWindow = (window) => {
    if (!mainWin) {
        mainWin = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        });
    }

    mainWin.loadFile(window);
};

const openWindow = (page, callback) => {
    let realPage;

    switch (page) {
        case '/administracion':
            realPage = path.join(__dirname, 'views/administrador_hermanos.html');
            initHermanosDatabase();
            break;

        // Add more cases for different pages if needed

        default:
            break;
    }

    if (realPage) {
        createWindow(realPage);
        if (callback && typeof callback === 'function') {
            callback();
        }
    }
};

app.whenReady().then(() => {
    createWindow(path.join(__dirname, 'views/index.html'));

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('goTo', (event, page) => {
    console.log("Now you are in:", page);
    openWindow(page);
});

ipcMain.handle('hermanosDB', async () => {
    console.log('Seleccionando hermanos:')
    setTimeout(() => { }, 1000)
    return await getAllHermanos()
});
