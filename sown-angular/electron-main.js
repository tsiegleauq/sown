const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        // so third party js (in here ruffle) works
        webPreferences: {
            nodeIntegration: true
        }
    });

    const urlFormat = url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    });

    win.loadURL(urlFormat);

    win.on('closed', () => {
        win = null;
    });

    win.webContents.on('did-fail-load', () => {
        win.loadURL(urlFormat);
    });
}

app.on('ready', createWindow);

// on macOS, closing the window doesn't quit the app
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        main();
    }
});
