const { app } = require("electron");
const path = require("path");

const iconPath = app.isPackaged
    ? path.join(process.resourcesPath, "app.asar.unpacked", "WhatsApp_icon.png")
    : path.join(__dirname, "..", "assets", "WhatsApp_icon.png");

const USER_AGENT =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const SIDEBAR_ACCELERATOR = "CmdOrCtrl+Shift+T";

function acceleratorLabel(accelerator) {
    return accelerator.replace("CmdOrCtrl", process.platform === "darwin" ? "Cmd" : "Ctrl");
}

module.exports = {
    iconPath,
    USER_AGENT,
    SIDEBAR_ACCELERATOR,
    acceleratorLabel
};