const { Menu, app, dialog, session } = require("electron");

const state = require("./state");
const store = require("./store");
const sidebarController = require("./sidebar-controller");
const i18n = require("./i18n");
const { updateTray } = require("./tray");
const { SIDEBAR_ACCELERATOR } = require("./constants")


function onLanguageChange(pref) {
    i18n.setLocalePreference(pref);
    createMenu();
    updateTray();
}

function buildTemplate() {
    const currentLangPref = i18n.getLocalePreference();

    return [
        {
            label: i18n.t("menu.whatsapp"),
            submenu: [
                {
                    label: i18n.t("menu.reload"),
                    accelerator: "Ctrl+R",
                    click: () => state.win.reload()
                },
                {
                    label: i18n.t("menu.clearCache"),
                    click: async () => {
                        const { response } = await dialog.showMessageBox({
                            type: "warning",
                            title: i18n.t("dialog.clearCache.title"),
                            buttons: [i18n.t("dialog.clearCache.cancel"), i18n.t("dialog.clearCache.continue")],
                            message: i18n.t("dialog.clearCache.message")
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
                    label: i18n.t("menu.closeBehavior"),
                    submenu: [
                        {
                            label: i18n.t("menu.hideToTray"),
                            type: "radio",
                            checked: store.get("closeAction", "hide") === "hide",
                            click: () => store.set("closeAction", "hide")
                        },
                        {
                            label: i18n.t("menu.quitCompletely"),
                            type: "radio",
                            checked: store.get("closeAction") === "quit",
                            click: () => store.set("closeAction", "quit")
                        }
                    ]
                },
                {
                    label: i18n.t("menu.language"),
                    submenu: [
                        {
                            label: i18n.t("menu.languageSystem"),
                            type: "radio",
                            checked: currentLangPref === "system",
                            click: () => onLanguageChange("system")
                        },
                        {
                            label: i18n.t("menu.languageEs"),
                            type: "radio",
                            checked: currentLangPref === "es",
                            click: () => onLanguageChange("es")
                        },
                        {
                            label: i18n.t("menu.languageEn"),
                            type: "radio",
                            checked: currentLangPref === "en",
                            click: () => onLanguageChange("en")
                        }
                    ]
                },
                { type: "separator" },
                {
                    label: i18n.t("menu.quit"),
                    accelerator: "Ctrl+Q",
                    click: () => {
                        state.isQuitting = true;
                        app.quit();
                    }
                }
            ]
        },
        {
            label: i18n.t("menu.view"),
            submenu: [
                { role: "togglefullscreen", label: i18n.t("menu.toggleFullscreen") },
                { role: "toggleDevTools", label: i18n.t("menu.toggleDevTools") },
                { type: "separator" },
                {
                    label: i18n.t("menu.hideSidebar"),
                    type: "checkbox",
                    accelerator: SIDEBAR_ACCELERATOR,
                    checked: sidebarController.getHidden(),
                    click: () => {
                        sidebarController.toggle();
                        createMenu();
                    }
                }
            ]
        }
    ];
}

function onLanguageChange(pref) {
    i18n.setLocalePreference(pref);
    createMenu();
    updateTray();
    sidebarController.applyLabelsToWindow();
}

function createMenu() {
    Menu.setApplicationMenu(Menu.buildFromTemplate(buildTemplate()));
}

module.exports = { createMenu };