/**
 * 主进程，控制应用的生命周期
 */
import { app, ipcMain } from "electron";
import { windowManage } from "../../scripts/main/WindowManage";
import { Channels } from "../share/channels";

app.whenReady().then(async () => {
  ipcMain.on(Channels.WINDOW.OPEN, (event, options) => {
    let name = "";
    let winType = "";

    if (typeof options === "string") {
      name = options;
      winType = name;
    } else {
      name = options.name;
      winType = options.winType ? options.winType : options.name;
    }
    const openWinReplyInfo = {
      name,
      isNew: true,
    };
    console.log("Channels.WINDOW.OPEN", name)
    const winInstance = windowManage.winInstances[name];
    if (winInstance) {
      openWinReplyInfo.isNew = false;
      event.reply(Channels.WINDOW.OPEN_REPLY, openWinReplyInfo);
      return;
    }
    windowManage.createWindow(name, winType, options.query, {
      confirmBeforeClose: options.confirmBeforeClose,
      parent: options.parent,
    });
    openWinReplyInfo.isNew = true;
    event.reply(Channels.WINDOW.OPEN_REPLY, openWinReplyInfo);
  });
  console.log("🚀🚀 main start...")

  windowManage.createWindow("Login");
});

//当所有窗口都被关闭后退出
app.once("window-all-closed", () => app.quit());
