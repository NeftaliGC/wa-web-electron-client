const { Menu, app } = require("electron")
const state = require("./state");
const store = require("./store")

const templateMenu = [
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
                    isQuitting = false;
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
            isQuitting = true;
            app.quit();
            }
        },
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

function createMenu() {
    Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu))
}

module.exports = {
    createMenu
}