import axios from 'axios'

import storage from '../utils/storage'

export const login = async (userinfo: { nickname: string; email: string; remember: boolean }): Promise<{ token: string } | boolean> => {
  const res = await axios.post('/api/user/login', userinfo)
  if (res.data.token) {
    storage.set('token', res.data.token)
    return true
  }
  return false
}

export const getUserList = async (query?: object) => {
  const res = await axios.get('/api/user/list', { params: { ...query } })
  if (res.data) {
    return res.data.users
  }
  return []
}

export const delUser = async (id: string) => {
  const res = await axios.post('/api/user/real_del', { id })
  if (res.data) {
    return res.data
  }
  return {}
}

export const getRandomAvatar = (params: object) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: '/avatar',
        params,
      })
      data.code ? resolve(data) : resolve(null)
    } catch (err) {
      reject(err)
    }
  })
}

export const logout = async (obj: any) => {}
