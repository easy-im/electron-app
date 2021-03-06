/** @type {Object.<string,import('electron').BrowserWindowConstructorOptions>} */
/**
 * 页面窗口配置
 */
const windowConfig = {
  Login: {
    title: "Easy Im 登陆",
    backgroundColor: "#FFF",
    frame: false,
    titleBarStyle: "hidden",
    width: 364,
    height: 526,
    minWidth: 364,
    minHeight: 526,
    resizable: false,
    maximizable: false,
    minimizable: true,
    fullscreenable: false,
    webPreferences: {
      devTools: true,
    },
  },
  Updater: {
    title: "更新",
    backgroundColor: "#FFF",
    width: 304,
    height: 440,
    resizable: false,
    maximizable: false,
    minimizable: true,
    fullscreenable: false,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      devTools: true,
    },
    alwaysOnTop: true,
  },
};

export default windowConfig;
