import { BrowserWindow, screen } from "electron";
import URL from "url";
import path from "path";
const confirmCloseWindow = Object.create(null);
/** @type {Object.<string, BrowserWindow>} */
const winInstances = Object.create(null);
/** @type {Object.<string, BrowserWindow>} */
const webViewInstances = Object.create(null);
const isDevelopment = process.env.NODE_ENV !== "production";
import windowConfig from "./windowConfig";
import { Channels } from "../../src/share/channels";
import serveConfig from "../../src/share/serve.json"

class WindowManage {
  appMainWindow: null;
  webViewInstances: any;
  confirmCloseWindow: any;
  winInstances: any;
  constructor() {
    //所有实例共享集合
    this.winInstances = winInstances;
    this.webViewInstances = webViewInstances;
    this.confirmCloseWindow = confirmCloseWindow;
    this.appMainWindow = null;
  }
  /**
   * 创建内部页面窗口
   * @param {string} name - 窗口名称，必须对应一个 renderer 的 entry
   * @param {string} winType - 窗口类型，在windowConfig.js里面定义的key
   * @param {object} query - 加载页面的URI参数
   * @param {object} otherOptions - 额外的配置项，用来配置是否需要确认关闭等行为
   * @param {string} url - 直接指定外部url 打开窗口
   */
  createWindow(
    name: string | number,
    winType?: string,
    query?: any,
    otherOptions?: { confirmBeforeClose: any; parent: any },
    url?: any
  ) {
    console.log("open page 🖥 :", name);
    const workArea = screen.getPrimaryDisplay().workArea;
    let myWinType = winType ? winType : name;
    // @ts-ignore
    const config = windowConfig[myWinType];
    // if (!global.globalSharedData.devtools) {
    //   config.webPreferences.devTools = false;
    // }
    const defaultWidth = Math.min(workArea.width, 1100);
    const defaultHeight = Math.min(workArea.height, 720);
    let win = new BrowserWindow({
      width: defaultWidth,
      height: defaultHeight,
      fullscreenable: process.platform !== "darwin",
      parent: process.platform === "darwin" ? this.appMainWindow : null,
      ...config,
      webPreferences: {
        enableRemoteModule: true,
        contextIsolation: false,
        nodeIntegration: true,
        devTools: false,
        ...config.webPreferences,
      },
    });

    if (otherOptions && otherOptions.confirmBeforeClose) {
      confirmCloseWindow[name] = true;
    }
    let winUrl = url
      ? url
      : isDevelopment
      ? URL.format({
          protocol: "http",
          host: config["host"] || `localhost:${serveConfig.renderer.port}`,
          // @ts-ignore
          pathname: myWinType,
          query,
        })
      : URL.format({
          protocol: "file",
          pathname: path.join(__dirname, `${myWinType}/index.html`),
          query,
          slashes: true,
        });
    win.loadURL(winUrl);

    win.on("close", (event: any) => {
      console.log(`close ${winType}`,'需要确认关闭的页面','confirmCloseWindow');

      if (confirmCloseWindow[name]) {
        event.preventDefault();
        event.sender.send(Channels.APP.SHOW_EXIT_PROMPT);
        return;
      }
    });

    // 确认关闭了才能清除实例
    win.on("closed", () => {
      console.log(`closed ${winType} ${name}`);
      winInstances[name] = null;
      // @ts-ignore
      win = null;
      /* 更新現在的主窗口 */
      this.appMainWindow =
        winInstances["Login"] || winInstances["updater"] || null;
      // 这里可以做一些某些窗口关闭要做的事
    });

    winInstances[name] = win;

    win.on("maximize", () => {
      win.webContents.send("maximize");
    });
    win.on("minimize", () => {
      win.webContents.send("minimize");
    });
    win.on("unmaximize", () => {
      win.webContents.send("unmaximize");
    });
    
    /* 更新現在的主窗口 */
    /**主窗口，主要用來，只有一個运用实例的时候，如果后面再点击图标，就显示对应的主窗口 */
    this.appMainWindow =
      winInstances["Login"] ||
      winInstances["updater"] ||
      null;
    return win;
  }
  /**
   * 通过webview创建自定义窗口， 打开指定外部链接
   * @param {string} url - 直接指定外部url 打开窗口
   * @param {object} config - 新建窗口配置
   * @param {object} name - webview 的名字
   * @param {string} title - 窗口title
   */
  createNewWindowByWebView({
    webviewSrc,
    name = "webview",
    config = {},
    title = "",
    parentName,
  }: any) {
    if (!webviewSrc || !name) return;
    //取 路由的最后一个单词作为 name
    if (webViewInstances[name]) {
      webViewInstances[name].show();
      return webViewInstances[name];
    }
    let webviewNormalConfig = {
      title: "webview",
      frame: false,
      titleBarStyle: "hidden",
      width: 960,
      height: 640,
      transparent: true,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        devTools: true,
        webviewTag: true,
      },
    };
    if (parentName) {
      const parent = this.winInstances[parentName] || null;
      parent && (config.parent = parent);
    }
    // @ts-ignore
    const win = new BrowserWindow(mergeConfig(webviewNormalConfig, config));
    const winUrl = isDevelopment
      ? URL.format({
          protocol: "http",
          host: "localhost:8082",
          pathname: "webviewWindow",
        })
      : URL.format({
          protocol: "file",
          pathname: path.join(__dirname, "webviewWindow/index.html"),
          slashes: true,
        });
    win.loadURL(winUrl);

    win.webContents.on("dom-ready", () => {
      win.webContents.send("dom-ready-event", webviewSrc, title);
    });
    // 确认关闭了才能清除实例
    win.on("closed", () => {
      webViewInstances[name] = null;
    });

    win.once("ready-to-show", () => {
      win.show();
    });

    // if (isDevelopment) {
    //   win.webContents.openDevTools({
    //     mode: "detach",
    //   })
    // }

    webViewInstances[name] = win;
    return win;
  }

  /**
   * 关闭当前窗口
   * @param {string} name - 窗口名称
   */
  close(name: string) {
    const winInstance = winInstances[name];
    if (winInstance) {
      winInstance.webContents.closeDevTools();
      winInstance.close();
    }
  }

  closeWebview(name: string) {
    //指定name 则关闭指定webview
    const winInstance = webViewInstances[name];
    if (winInstance) {
      winInstance.webContents.closeDevTools();
      winInstance.close();
    }
  }

  closeAllWindow(leftWin: string) {
    for (let win in winInstances) {
      if (win === leftWin) continue;
      confirmCloseWindow[win] = false;
      this.close(win);
    }
    for (let webview in webViewInstances) {
      confirmCloseWindow[webview] = false;
      this.closeWebview(webview);
    }
  }
}

function mergeConfig(
  originCofing: {
    title: string;
    frame: boolean;
    titleBarStyle: string;
    width: number;
    height: number;
    transparent: boolean;
    show: boolean;
    webPreferences: {
      nodeIntegration: boolean;
      devTools: boolean;
      webviewTag: boolean;
    };
  },
  selfConfig: {}
) {
  const isObject = (val: any) =>
    Object.prototype.toString.call(val) === "[object Object]";
  const isReg = (val: any) =>
    Object.prototype.toString.call(val) === "[object RegExp]";
  const isDate = (val: any) =>
    Object.prototype.toString.call(val) === "[object Date]";
  const isArray = (val: any) =>
    Object.prototype.toString.call(val) === "[object Array]";
  const deep = (
    origin: {
      [x: string]: any;
      title?: string;
      frame?: boolean;
      titleBarStyle?: string;
      width?: number;
      height?: number;
      transparent?: boolean;
      show?: boolean;
      webPreferences?: {
        nodeIntegration: boolean;
        devTools: boolean;
        webviewTag: boolean;
      };
    },
    self: { [x: string]: any }
  ) => {
    if (!self) return origin;
    if (!origin) origin = Object.create(null);
    for (let key in self) {
      let value = self[key];
      if (isReg(value)) {
        origin[key] = new RegExp(value);
      } else if (isArray(value)) {
        origin[key] = [...value];
      } else if (isDate(value)) {
        origin[key] = new Date(value);
      } else if (isObject(value)) {
        origin[key] = deep(origin[key], value);
      } else {
        origin[key] = value;
      }
    }
    return origin;
  };
  return deep(originCofing, selfConfig);
}

const windowManage = new WindowManage();

export { windowManage };
