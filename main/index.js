const { app, ipcMain } = require("electron");

const { createWindow } = require("./window");
const { createTray } = require("./tray");
const { createMenu } = require("./menu");
const sidebarController = require("./sidebar-controller");

const state = require("./state");

app.setAppUserModelId("com.nintech.wa-web-electron-client");
app.setName("Unofficial WhatsApp Web Electron Client");

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on("second-instance", () => {
        if (state.win) {
            state.win.show();
            state.win.focus();
        }
    });
}

ipcMain.on("sidebar:toggle", () => {
    sidebarController.toggle();
    createMenu();
});

app.whenReady().then(() => {
    createWindow();
    createMenu();
    createTray();
});