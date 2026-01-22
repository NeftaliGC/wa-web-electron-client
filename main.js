const { app, BrowserWindow, Tray, Menu, dialog, session } = require("electron");
const Store = require("electron-store").default;
const path = require("path");

const iconPath = app.isPackaged
    ? path.join(process.resourcesPath, "app.asar.unpacked", "WhatsApp_icon.png")
    : path.join(__dirname, "WhatsApp_icon.png");

const store = new Store();

app.setAppUserModelId("WhatsApp Web Client");
app.setName("WhatsApp Web Client");


let win;
let tray;
let isQuitting = false;

const gotTheLock = app.requestSingleInstanceLock();


if (!gotTheLock) {
    app.quit();
} else {
    app.on("second-instance", () => {
        if (win) {
        win.show();
        win.focus();
        }
    });
}

const menuTemplate = [
    {
        label: "WhatsApp",
        submenu: [
        {
            label: "Recargar",
            accelerator: "Ctrl+R",
            click: () => win.reload()
        },
        {
            label: "Limpiar caché y cerrar sesión",
            click: async () => {
                const { response } = await dialog.showMessageBox({
                    type: "warning",
                    buttons: ["Cancelar", "Continuar"],
                    message: "Esto cerrará la sesión de WhatsApp"
                });

                if (response === 1) {
                    await session.defaultSession.clearStorageData();
                    isQuitting = false;
                    app.relaunch();
                    win.reload();
                }
            }
        },
        { type: "separator" },
        {
            label: "Salir",
            accelerator: "Ctrl+Q",
            click: () => {
            isQuitting = true;
            app.quit();
            }
        }
        ]
    },
    {
        label: "Vista",
        submenu: [
        { role: "togglefullscreen" },
        { role: "toggleDevTools" }
        ]
    }
];

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));


function createWindow() {
    win = new BrowserWindow({
        width: store.get("width", 1000),
        height: store.get("height", 800),
        autoHideMenuBar: false,
        icon: iconPath,
        title: "WhatsApp Web Client",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    win.webContents.setVisualZoomLevelLimits(1, 1);

    win.webContents.on("before-input-event", (event, input) => {
        if (input.control && input.key.toLowerCase() === "r") {
            event.preventDefault();
        }
    });

    const userAgent =
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

    win.loadURL("https://web.whatsapp.com", { userAgent });

    win.on("close", (event) => {
        if (!isQuitting) {
            event.preventDefault();
            store.set("width", win.getBounds().width);
            store.set("height", win.getBounds().height);
            win.hide();
        }
    });

}



app.whenReady().then(() => {

    createWindow();

    tray = new Tray(iconPath);
    tray.setToolTip("WhatsApp Web Client");

    tray.setContextMenu(Menu.buildFromTemplate([
        { label: "Abrir", click: () => win.show() },
        { label: "Salir", click: () => { isQuitting = true; app.quit(); } }
    ]));

    // Doble clic abre la app
    tray.on("double-click", () => {
        win.show();
    });

});
