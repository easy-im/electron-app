import http from "./http"
/**
 * [登陆]()
 * 
 */
export function api_login(params : any) {
  const url = "/manta/api/v1.1/electron/tutor/live_lessons"
  return http.get(url, { params })
}