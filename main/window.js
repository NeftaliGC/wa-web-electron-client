const { BrowserWindow, shell } = require("electron");
const path = require("path");

const store = require("./store");
const state = require("./state");
const { iconPath, USER_AGENT } = require("./constants");
const { injectSidebar } = require("./inject");

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        icon: iconPath,
        title: "Unofficial WhatsApp Web Electron Client",
        frame: true,
        transparent: true,
        autoHideMenuBar: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "..", "preload", "index.js")
        }
    });

    state.win = win;
    win.webContents.setVisualZoomLevelLimits(1,1);
    win.loadURL("https://web.whatsapp.com", {
        userAgent: USER_AGENT
    });

    win.webContents.on("did-finish-load", () => {
        injectSidebar(win.webContents);
    });

    win.webContents.setWindowOpenHandler(({url})=>{
        shell.openExternal(url);
        return {action:"deny"};
    });

    win.webContents.on("will-navigate",(event,url)=>{
        if(url!==win.webContents.getURL()){
            event.preventDefault();
            shell.openExternal(url);
        }
    });

    win.webContents.on("before-input-event",(event,input)=>{
        if(input.control && input.key.toLowerCase()==="r"){
            event.preventDefault();
        }
    });

    win.on("close",(event)=>{
        const closeAction=store.get("closeAction","hide");
        if(closeAction==="hide" && !state.isQuitting){
            event.preventDefault();
            store.set("width",win.getBounds().width);
            store.set("height",win.getBounds().height);
            win.hide();
        }else{
            state.isQuitting=true;
        }
    });
    return win;
}

module.exports = {
    createWindow
};