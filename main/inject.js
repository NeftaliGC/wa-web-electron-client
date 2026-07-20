const fs = require("fs");
const path = require("path");
const sidebarController = require("./sidebar-controller");

const CSS_PATH = path.join(__dirname, "..", "renderer", "sidebar", "sidebar.css");
const JS_PATH = path.join(__dirname, "..", "renderer", "sidebar", "sidebar.js");

function injectSidebar(webContents) {
    try {
        const css = fs.readFileSync(CSS_PATH, "utf8");
        webContents.insertCSS(css);
    } catch (err) {
        console.error("[inject] No se pudo cargar sidebar.css:", err);
    }

    try {
        const js = fs.readFileSync(JS_PATH, "utf8");
        const initialHidden = sidebarController.getHidden();
        const initialLabels = sidebarController.getLabels();
        const bootstrap =
            `window.__WA_SIDEBAR_INITIAL_HIDDEN__ = ${initialHidden};\n` +
            `window.__WA_SIDEBAR_INITIAL_LABELS__ = ${JSON.stringify(initialLabels)};\n`;
        webContents.executeJavaScript(bootstrap + js);
    } catch (err) {
        console.error("[inject] No se pudo cargar sidebar.js:", err);
    }
}

module.exports = { injectSidebar };