import axios from "axios"
import { getUser } from "../utils/User"
import config from '../configs/index';


function authTokenGetter() {
  const currentUser = getUser()
  return currentUser?.token
}

const instance = axios.create({
  baseURL: config.baseUrl,
  headers: {
   'content-type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config: any) => {
    config.baseURL = config.baseUrl
    config.headers["Authorization"] = authTokenGetter()
    return config
  },
  (error : any) => {
    return Promise.reject(error)
  }
)

// 拦截响应
instance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response && error.response.status === 401) {
      // @todo 需要登录注册模块支持
    }
    return Promise.reject(error)
  }
)

// instance.refresh = function() {
//   instance.baseURL = 
// }
export default instance
