const { Tray, Menu, app } = require("electron");

const state = require("./state");
const { iconPath } = require("./constants");
const i18n = require("./i18n");

function buildContextMenu() {
    return Menu.buildFromTemplate([
        { label: i18n.t("tray.open"), click: () => state.win.show() },
        {
            label: i18n.t("tray.quit"),
            click: () => {
                state.isQuitting = true;
                app.quit();
            }
        }
    ]);
}

function createTray() {
    const tray = new Tray(iconPath);
    tray.setToolTip(i18n.t("tray.tooltip"));
    tray.setContextMenu(buildContextMenu());
    tray.on("double-click", () => state.win.show());
    state.tray = tray;
}

function updateTray() {
    if (!state.tray) return;
    state.tray.setToolTip(i18n.t("tray.tooltip"));
    state.tray.setContextMenu(buildContextMenu());
}

module.exports = { createTray, updateTray };