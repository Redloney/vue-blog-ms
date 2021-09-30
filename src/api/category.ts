import axios from './axios'

export const getCategorys = async (params?: object) => {
  try {
    const { data } = (await axios({
      method: 'GET',
      url: '/api/category/list',
      params,
    })) as any
    return data && data.code ? data.categorys : []
  } catch (error) {
    throw error
  }
}
