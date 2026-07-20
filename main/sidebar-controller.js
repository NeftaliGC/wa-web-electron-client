const store = require("./store");
const state = require("./state");
const i18n = require("./i18n");
const { SIDEBAR_ACCELERATOR, acceleratorLabel } = require("./constants");

const STORE_KEY = "sidebarHidden";

function getHidden() {
    return store.get(STORE_KEY, false);
}

function getLabels() {
    const shortcut = acceleratorLabel(SIDEBAR_ACCELERATOR);
    return {
        show: i18n.t("sidebar.show", { shortcut }),
        hide: i18n.t("sidebar.hide", { shortcut })
    };
}

function applyLabelsToWindow() {
    if (!state.win) return;
    const labels = getLabels();
    state.win.webContents
        .executeJavaScript(
            `window.WASidebar && window.WASidebar.setLabels(${JSON.stringify(labels)});`
        )
        .catch(() => {});
}

function applyToWindow(hidden) {
    if (!state.win) return;
    state.win.webContents
        .executeJavaScript(`window.WASidebar && window.WASidebar.setHidden(${hidden});`)
        .catch(() => {});
}

function setHidden(hidden) {
    store.set(STORE_KEY, hidden);
    applyToWindow(hidden);
}

function toggle() {
    const next = !getHidden();
    setHidden(next);
    return next;
}

module.exports = { getHidden, setHidden, toggle, applyToWindow, getLabels, applyLabelsToWindow };