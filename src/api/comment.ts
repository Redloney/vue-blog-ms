import axios from './axios'

export const getComment = async (query?: object) => {
  const { data } = (await axios({
    method: 'GET',
    url: '/api/comment/list',
    params: query,
  })) as any
  return data ? data.comments : []
}
