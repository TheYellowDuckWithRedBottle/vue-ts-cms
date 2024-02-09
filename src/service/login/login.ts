import { BASE_URL } from '../request/config'
import axios from 'axios'
import  {MapTemplate}  from './types'
axios.defaults.baseURL = BASE_URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
  },
  timeout: 1000 * 10
})

// 用户信息
export function loginAction(username: string, password: string) {
  return axiosInstance.post('/user/login', {
    username,
    password
  })
}
export function getUserInfo (id: string) {
  return axiosInstance.get('/user/user')
}
export function getUserMenu (username: string) {
  return axiosInstance.get('/user/menus', {
    params: username
  })
}
// 地图模板
export async function getMapTemplates() {
  // 设置请求头
  axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token') || ''
  return await axiosInstance.get('/MapTemplate/mapTemplates')
}
export async function deleteMapTemplate(id: string) {
  return await axiosInstance.delete(`/MapTemplate/${id}`)
}
export async function addMapTemplate(mapTemplate: MapTemplate) {
  return await axiosInstance.post('/MapTemplate/createMapTemplate', mapTemplate)
}
export default axiosInstance
