import { ipcRenderer } from "electron"
import { Channels } from "share/channels"

const currentUserLocalKey = "current_login_user"
export const isPreventAutoLoginKey = "is_prevent_auto_login"
export const isPreventAutoLoginEnum = {
  yes: "1",
  no: "0"
}

//设置user
export function getUser () {
  const local = localStorage.getItem(currentUserLocalKey)
  if (!local) {
    return null
  }
  try {
    const currentLoginUser = JSON.parse(local)
    return currentLoginUser
  } catch (err) {
    return null
  }
}
export function setUser (user : any) {
  const local = JSON.stringify(user)
  localStorage.setItem(currentUserLocalKey, local)
  const result = ipcRenderer.sendSync(Channels.DATA.SET_CURRENT_USER, user)
  console.log(`设置currentUser${result ? "成功" : "失败"}`)
}

export function removeUser () {
  localStorage.removeItem(currentUserLocalKey)
  const result = ipcRenderer.sendSync(Channels.DATA.SET_CURRENT_USER, null)
  localStorage.setItem(isPreventAutoLoginKey, isPreventAutoLoginEnum.yes)
  console.log(`设置currentUser${result ? "成功" : "失败"}`)
}

export const isPhoneNumber = (number: number | string) => {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|19[0-9])[0-9]{8}$/.test('' + number);
};