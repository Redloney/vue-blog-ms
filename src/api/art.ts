import axios from 'axios'

import { getToken } from '../utils'

export const getArtList = async (query: any) => {
  // 通过append向form对象添加数据
  const { data } = await axios({
    method: 'GET',
    url: '/api/article/list',
    params: { ...query },
  })
  return data && data.code ? data : []
}

export const insertArt = async (info: any) => {
  // 通过append向form对象添加数据
  const { data } = await axios({
    method: 'POST',
    url: '/api/article/insert',
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    data: { ...info },
  })
  return data && data.code ? data : false
}

export const updateArt = async (_id: string, info: any) => {
  // 通过append向form对象添加数据
  const { data } = await axios({
    method: 'POST',
    url: '/api/article/update',
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    data: { _id, info },
  })
  return data && data.code ? data : false
}

export const getArtDetail = async (_id: String) => {
  // 通过append向form对象添加数据
  const { data } = await axios({
    method: 'GET',
    url: '/api/article/detail',
    params: { _id },
  })
  return data && data.code ? data : false
}
