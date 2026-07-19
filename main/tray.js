const { Tray, Menu, app } = require("electron");

const state = require("./state");
const { iconPath } = require("./constants");

function createTray(){
    const tray=new Tray(iconPath);
    tray.setToolTip("WhatsApp Web Client");
    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label:"Abrir",
            click:()=>state.win.show()
        },
        {
            label:"Salir",
            click:()=>{
                state.isQuitting=true;
                app.quit();
            }
        }
    ]));
    tray.on("double-click",()=>{
        state.win.show();
    });
    state.tray=tray;
}

module.exports={
    createTray
};