const { Menu, app, dialog, session } = require("electron");
const state = require("./state");
const store = require("./store");
const sidebarController = require("./sidebar-controller");

const SIDEBAR_ACCELERATOR = "CmdOrCtrl+Shift+T"; // cámbialo aquí si choca con negritas

function buildTemplate() {
    return [
        {
            label: "WhatsApp",
            submenu: [
                {
                    label: "Recargar",
                    accelerator: "Ctrl+R",
                    click: () => state.win.reload()
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
                            state.isQuitting = false;
                            app.relaunch();
                            state.win.reload();
                        }
                    }
                },
                {
                    label: "Comportamiento al cerrar",
                    submenu: [
                        {
                            label: "Ocultar en bandeja",
                            type: "radio",
                            checked: store.get("closeAction", "hide") === "hide",
                            click: () => store.set("closeAction", "hide")
                        },
                        {
                            label: "Salir completamente",
                            type: "radio",
                            checked: store.get("closeAction") === "quit",
                            click: () => store.set("closeAction", "quit")
                        }
                    ]
                },
                { type: "separator" },
                {
                    label: "Salir",
                    accelerator: "Ctrl+Q",
                    click: () => {
                        state.isQuitting = true;
                        app.quit();
                    }
                }
            ]
        },
        {
            label: "Vista",
            submenu: [
                { role: "togglefullscreen" },
                { role: "toggleDevTools" },
                { type: "separator" },
                {
                    label: "Ocultar barra lateral",
                    type: "checkbox",
                    accelerator: SIDEBAR_ACCELERATOR,
                    checked: sidebarController.getHidden(),
                    click: () => {
                        sidebarController.toggle();
                        createMenu(); // reconstruye para reflejar el nuevo checked
                    }
                }
            ]
        }
    ];
}

function createMenu() {
    Menu.setApplicationMenu(Menu.buildFromTemplate(buildTemplate()));
}

module.exports = { createMenu };