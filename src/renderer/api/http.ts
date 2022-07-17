import axios from "axios"
import { getUser } from "../utils/User"
import Config from '../configs/index';
console.log('))))))',Config)

function authTokenGetter() {
  const currentUser = getUser()
  return currentUser?.token
}

const instance = axios.create({
  baseURL: Config.baseUrl,
  headers: {
   'content-type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config: any) => {
    console.log("config.baseUrl,", config)
    config.baseURL = Config.baseUrl
    config.headers["x-access-token"] = authTokenGetter()
    return config
  },
  (error : any) => {
    return Promise.reject(error)
  }
)

// 拦截响应
instance.interceptors.response.use(
  (response: any) => {
    return response?.data || response
  },
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
