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
export async function loginAction(username: string, password: string) {
  return (await axiosInstance.post('/user/login', {
    username,
    password
  })).data
}
export async function getUserInfo (id: string) {
  return (await (axiosInstance.get('/user/user'))).data
}
export async function getUserInfoByName(username: string) {
   const params = {
    username
  }
  return (await axiosInstance.get('/user/getUserByName', {
    params
  })).data
}
export async function getUserMenu (username: string) {
  return (await axiosInstance.get('/user/menus', {
    params: username
  })).data
}
export async function updateUserAvatar(username: string ,avatar: string){
  const user = {
    username: username,
    email: '',
    phone: '',
    role: '',
    avatar: avatar
  }
  return (await axiosInstance.post('/User/updateUserAvatar', user)).data
}
// 地图模板
export async function getMapTemplates() {
  // 设置请求头
  axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token') || ''
  return (await axiosInstance.get('/MapTemplate/mapTemplates')).data
}
export async function deleteMapTemplate(id: string) {
  return (await axiosInstance.delete(`/MapTemplate/${id}`)).data
}
export async function addMapTemplate(mapTemplate: MapTemplate) {
  return (await axiosInstance.post('/MapTemplate/createMapTemplate', mapTemplate)).data
}
export default axiosInstance
