// 这个文件可能会被主进程和渲染进程分别引用
// 为了避免命名冲突和名称对不上的问题

const Channels = {
  APP: {
    LOGOUT: "app-logout",
    START_UPDATE: "app-start-update",
    SHOW_EXIT_PROMPT: "page:show_exit_prompt",
    CONFIRM_CLOSE: "page:confirm_close",
    EXIT_APP: "app-exit",
    /**登录失效 */
    LOGIN_INVALID: "user-login-invalid"
  },
  WINDOW: {
    /** 打开一个指定名称的窗口 */
    OPEN: "app:openWindow",
    OPEN_REPLY:"app:openWindowReply",
    CLOSE: "close-window",
    CLOSE_ALL_WINDOWS: "close-all-windows",
  },
  DATA: {
    SET_CURRENT_USER: "set-current-user",
  },
}

export { Channels }
