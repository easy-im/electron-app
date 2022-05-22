/** @type {Object.<string,import('electron').BrowserWindowConstructorOptions>} */
const windowConfig = {
  updater: {
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
  Login: {
    title: "Easy im 登陆",
    backgroundColor: "#FFF",
    frame: false,
    titleBarStyle: "hiddenInset",
    width: 364,
    height: 475,
    minWidth: 364,
    minHeight: 475,
    resizable: false,
    maximizable: false,
    minimizable: true,
    fullscreenable: false,
    webPreferences: {
      devTools: true,
    },
  },
}

export default windowConfig
