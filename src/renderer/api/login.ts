import http from "./http"
/**
 * [登陆]()
 * 
 */
export function api_login(params : any) : Promise<NSAPI.NSGlobal.IResponse<NSUser.IInfo>> {
  const url = "/user/login"
  return http.put(url, params)
}