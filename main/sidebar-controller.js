const store = require("./store");
const state = require("./state");

const STORE_KEY = "sidebarHidden";

function getHidden() {
    return store.get(STORE_KEY, false);
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

module.exports = { getHidden, setHidden, toggle, applyToWindow };