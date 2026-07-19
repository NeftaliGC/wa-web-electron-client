const { app } = require("electron");

const { createWindow } = require("./window");
const { createTray } = require("./tray");
const { createMenu } = require("./menu");

const state = require("./state");

app.setAppUserModelId("WhatsApp Web Client");
app.setName("WhatsApp Web Client");

const gotTheLock=app.requestSingleInstanceLock();

if(!gotTheLock){
    app.quit();
}else{
    app.on("second-instance",()=>{
        if(state.win){
            state.win.show();
            state.win.focus();
        }
    });
}

app.whenReady().then(()=>{
    createWindow();
    createMenu();
    createTray();
});