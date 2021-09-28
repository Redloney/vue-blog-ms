import axios from './axios'

export const getStatus = async (query: any) => {
  // 通过append向form对象添加数据
  const { data } = await axios({
    method: 'GET',
    url: '/api/status/list',
    params: { ...query },
  })
  return data && data.code ? data.status : []
}
