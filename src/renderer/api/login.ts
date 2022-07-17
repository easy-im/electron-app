import http from "./http"
/**
 * [登陆]()
 * 
 */
export function api_login(params : any) {
  const url = "/user/login"
  return http.put(url, params)
}